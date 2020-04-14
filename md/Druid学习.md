# Druid 学习

# [阿里druid介绍及配置](https://www.cnblogs.com/lmaplet/p/6170105.html)

* 整个项目由 数据库连接池, 插件框架 和 SQL解析器组成
* 主要是为了扩展JDBC的一些限制, 让程序员通过定制来实现一些特殊的需求, 比如 向秘钥服务请求凭证, 统计SQL信息, SQL性能收集, SQL注入检查, SQL翻译等

## 配置
* DruidDataSource 大部分参考 DBCP
* [官网配置](https://github.com/alibaba/druid/wiki/DruidDataSource配置)

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
    <property name="url" value="${jdbc_url}"/>
    <property name="username" value="${jdbc_user}"/>
    <property name="password" value="${jdbc_password}"/>

    <property name="filters" value="stat"/>

    <property name="maxActive" value="20"/>
    <property name="initialSize" value="1"/>
    <property name="maxWait" value="60000"/>
    <property name="minIdle" value="1"/>

    <property name="timeBetweenEvictionRunsMillis" value="60000"/>
    <property name="minEvictableIdleTimeMillis" value="30000"/>

    <property name="testWhileIdle" value="true"/>
    <property name="testOnBorrow" value="false"/>
    <property name="testOnReturn" value="false"/>
    
    <property name="poolPreparedStatements" value="true"/>
    <property name="maxOpenPreparedStatements" value="20"/>
</bean>
```

## 配置说明

|配置|缺省值|说明|
|---|---|---|
|name||若有多个数据源, 监控时可通过此来区分<br>若未配置, 会自动生成一个, 格式: "DataSource-" + System.identityHashCode(this)<br>在1.0.5版本中此配置无效且会报错
|url||连接数据库的url, 不同数据库会不一样<br>mysql: jdbc\:mysql\://{IP}\:{端口}/{库名}?useUnicode\=true&characterEncoding\=utf8<br>EC: jdbc:mylistsql:root/@{IP}:{端口}
|username||连接数据库的用户名
|password||连接数据库的密码. [用 ConfigFilter 来避免密码写在配置文件中](https://github.com/alibaba/druid/wiki/使用ConfigFilter)<br>[* 加密的密码](https://github.com/alibaba/druid/wiki/使用ConfigFilter#22-%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E6%BA%90%E6%8F%90%E7%A4%BAdruid%E6%95%B0%E6%8D%AE%E6%BA%90%E9%9C%80%E8%A6%81%E5%AF%B9%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%86%E7%A0%81%E8%BF%9B%E8%A1%8C%E8%A7%A3%E5%AF%86)
|driverClassName|根据url自动识别|Ec数据库的驱动要注意
|initialSize|0|初始化时建立物理连接的个数. 初始化发生在显示调用init方法, 或第一次getConnection时
|maxActive|8|最大连接池数量
|~~maxIdle~~|8|没用了, 配置了也没效果
|minIdle||最小连接池数量
|maxWait||获取连接时最大等待时间, 单位毫秒. 配置此后, 缺省启动公平锁, 并发效率**下降**, 可以设置useUnfairLock属性为true使用非公平锁.
|poolPreparedStatements|false|是否缓存preparedStatement, 即PSCache. PSCache对支持游标的数据库性能提升巨大, 如Oracle. **mysql建议关闭**
|maxOpenPreparedStatements|-1|要启动PSCache,必须设置大于0.<br>当大于0时, poolPreparedStatements自动改为true. Oracle下不会内存过多,可以设大一点,如100
|validationQuery||用来检测连接是否有效的sql, 要求是一个查询语句.<br>如果此处为null, testOnBorrow,testOnReturn,testWhileIdle都不会生效
|validationQueryTimeout||单位:秒, 检测连接是否有效的超时时间. 底层调用jdbc Statement对象的void setQueryTimeout(int seconds)方法
|testOnBorrow|true|申请连接时执行validationQuery检查连接是否有效, **配置后降低性能**
|testOnReturn|false|归还连接时执行validationQuery检查连接是否有效, **配置后降低性能**
|testWhileIdle|false|建议配置为True, 不影响性能, 且保证安全性. 申请连接时检测, 如果空闲时间大于timeBetweenEvictionRunsMillis, 执行validationQuery检测连接是否有效
|keepAlive|false<br>(1.0.28)|连接池中的minIdle数量以内的连接, 空闲时间超过minEvictableIdleTimeMillis, 会执行keepAlive操作
|timeBetweenEvictionRunsMillis|1分钟<br>(1.0.14)|1)Destroy线程会检测连接的间隔时间, 如果连接空闲时间大于等于minEvictableIdleTimeMillis则关闭物理连接.<br>2)testWhileIdle的判断依据
|~~numTestsPerEvictionRun~~|30分钟<br>(1.0.14)|不在使用, 一个DruidDataSource只支持一个EvictionRun
|minEvictableIdleTimeMillis||连接保持空闲而不被驱逐的最小时间
|connectionInitSqls||物理连接初始化的时候执行的sql
|exceptionSorter|根据dbType自动识别|当数据库抛出一些不可恢复的异常时, 抛弃连接
|filters||属性类型是字符串, 通过别名的方式配置扩展插件, 包括:<br>监控统计 : filter:stat<br>日志 : filter:log4j<br>防御sql注入 : filter:wall
|proxyFilters||类型是`List<com.alibaba.druid.filter.Filter>`, 如果同时配置了filters 和 proxyFilters, 是组合关系, 并非替代关系

## 配置监控统计功能

在web.xml中启动Web监控统计功能

```xml
<!-- Druid连接池 启动Web监控统计功能 start -->
<filter>
    <filter-name>DruidWebStatFilter</filter-name>
    <filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
    <init-param>
        <param-name>exclusions</param-name>
        <param-value>*.js,*.git,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>DruidWebStatFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>DruidStatView</servlet-name>
    <url-pattern>/druid/*</url-pattern>
</servlet-mapping>
<!-- Druid连接池 启动Web监控统计功能 end -->
```

## 监视访问说明

StatViewServlet 是一个标准的 javax.servlet.http.HttpServlet  需要配置在web应用中的WEB-INF/web.xml中.
根据配置中的url-pattern来访问内置监控页面, 如果是上面的配置, 内置监控页面的首页是/druid/index.html



## 配置 StatViewServlet 
* [配置文件样例](web-druid-webstat.xml)
* 配置用户名和密码, 详见样例
* 配置allow(白名单)和deny(黑名单), 详见样例
    * 判断规则
        * deny优先于allow, 如果出现在deny列表中, 就算在allow列表中, 也会被拒绝
        * 如果allow没有配置或为空, 则允许所有访问
    * IP设置规则
        * 格式 : `<IP> 或者 <IP>/<SUB_NET_MASK_size>` 例子: `128.242.127.1/24` 24表示, 前面24位是子网掩码, 比对的时候, 前面24位相同就匹配
    * 不支持IPv6 : 配置了黑白名单后, 导致IPV6无法访问
* 配置 resetEable  
用于控制html页面中Reset All功能是否有效, 

* 按需要配置Spring和Web的关联监控
    * Web关联监控配置 [GO](https://github.com/alibaba/druid/wiki/配置_配置WebStatFilter)
    * Spring关联监控配置 [GO](https://github.com/alibaba/druid/wiki/配置_Druid和Spring关联监控配置)





# [Druid 介绍及配置](https://www.cnblogs.com/niejunlei/p/5977895.html)

* 是Java语言的数据库连接池
* 能够提供强大的监控和扩展功能
* 下载地址: maven com.alibaba.druid
* 源代码: https://github.com/alibaba/druid
* 配置Maven : 

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>${druid-version}</version>
</dependency>
```

## 怎么打开Druid的监控统计功能
* 通过filter-chain扩展实现, 要打开监控统计功能, 需要配置 StatFilter, https://github.com/alibaba/druid/wiki/配置_StatFilter

## 怎么使用Druid的内置监控页面

## 内置监控中的Web和Spring关联解控怎么配置

## 怎么配置防御SQL注入攻击

## Druid有没有参数配置

## 日志记录JDBC执行的SQL, 如何配置

## 程序长生了连接泄露, 有什么办法

## 在Druid中使用PSCache会有内存占用过大问题么?

## 与其他数据库连接池的对比
吹上了天

## 从其他连接池迁移要注意什么?

## Druid中有类似Jboss DataSource中的ExceptionSorter
与Jboss DataSource 的功能相同, 但不用手动配置, 自动识别生效.

## Druid中的maxIdle是没用的
* maxIdle 是Druid为了方便DBCP用户迁移而增加的, maxIdle 是一个混乱的概念
* 连接池只应该有 maxPoolSize 和 minPoolSize , druid 只保留了 maxActive 和 minIdle , 分别相当于 maxPoolSize 和 minPoolSize

## JNDI 数据源, 可以用 DruidDataSource
实现类: com.alibaba.druid.pool.DruidDataSourceFactory , 加深理解

## 在代码中写死的DBCP, 怎么改Druid

## 有一些SQL执行很慢, 如何配置日志记录
StatFilter配置

## 加密数据库密码
Druid提供了数据库密码加密的功能

## 如果 DruidDataSource 在init的时候失败了, 不再使用, 是否需要close
是的, 如果DruidDataSource不在使用, 必须调用close来释放资源, 释放的资源包括关闭 Create 和 Destory 线程

## DruidDataSource 支持哪些数据库?
支持所有jdbc驱动的数据库

|数据库|支持状态|我们用的|
|---|---|---|
|mysql|支持, 大规模使用|√|
|oracle|支持, 大规模使用|
|sqlserver|支持|
|postgres|支持|
|db2|支持|
|h2|支持|
|derby|支持|
|sqlite|支持|√|
|sybase|支持|

## Druid 如何自动根据 URL 自动识别 DriverClass 的
可以根据URL前缀来识别DriverClass

|前缀|DriverCLass|
|---|---|
|jdbc:mysql|com.mysql.jdbc.Driver|
|jdbc:sqlite|org.sqlite.JDBC|



[另一个druid](doc/1.md), 不是我们要研究的阿里的druid