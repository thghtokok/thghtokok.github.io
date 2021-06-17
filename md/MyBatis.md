
# 拓展

* [MyBatis-Plus](https://mp.baomidou.com/)

## 快速开始

```xml
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.2</version>
        </dependency>
```

# Mybatis-spring-boot-starter

[学习地址](http://www.mybatis.cn/archives/861.html)

完成以下功能

1. 自动发现存在的DataSource
2. 利用SqlSessionFactoryBean创建并注册SqlSessionFactory
3. 创建并注册SqlSessionTemplate
4. 自动扫描Mappers, 并注册到Spring上下文环境方便程序的注入使用

## 高级扫描

@Mapper 给每个Mapper类添加的注解
@MapperScan注解来扫描包, 节约给每个类添加 @Mapper 的工作

## @Mapper注解的使用

作用: 在接口类上添加@Mapper , 编译后会生成相应接口的实现类
添加位置: 接口类

## @MapperScan注解的使用

作用: 指定要变成实现类的接口所在的包, 包下面的所有接口在编译后, 都会生成相应的实现类
添加位置: SpringBoot启动类
多个包时, 用大括号, 以逗号分隔

# MyBatis 学习笔记

[学习地址](https://mybatis.org/mybatis-3/zh/index.html)

## Java API

注解               | 使用对象 | XML等价形式  | 描述

* @CacheNamespace    | 类       | cache
  * 为给定的命名空间(比如类)配置缓存.
  * 属性:
    * implementation,
    * eviction,
    * flushInterval,
    * size,
    * readWrite,
    * blocking,
    * properties.
* @property          | N/A      | property
  * 指定参数值或定位符(placeholder), 该占位符能被mybatis-config.xml内的配置属性替换,  (3.4.2以上可用)
  * 属性:
    * name,
    * value
* @CacheNamespaceRef | 类       | cacheRef
  * 引用另一个命名空间的缓存以供使用.
  * 注意: 使用共享相同的全限定类名, 在XML映射文件中声明的缓存仍被是被为一个独立的命名空间,
  * 属性: 如果你使用了这个注解, 应该设置value或者name属性的其中一个.
    * value 属性用于指定能够表示该命名空间的Java类型(命名空间名就是Java类型的全限定类名)
    * name 属性(3.4.2以上可用)则直接制定了命名空间的名字
* @ConstructorArgs | 方法 | constructor
  * 收集一组结果以传递给一个结果对象的构造方法
  * 属性:
    * value  一个Arg数组
* @Arg | N/A | arg   idArg
  * ConstructorArg 集合的一部分, 代表一个构造方法参数  3.5.4开始, 该注解可以重复注解
  * 属性:
    * id   与XML idArg相似, 是一个布尔值, 表示该属性是否用于唯一标识和比较对象
    * column
    * javaType
    * jdbcType
    * typeHandler
    * select
    * resultMap
* @TypeDiscriminator | 方法| discriminator
  * 决定使用何种结果映射的一组取值(case)
  * 属性:
    * column
    * javaType
    * jdbcType
    * typeHandler
    * cases  一个Case的数组
* @Case |N/A| case
  * 表示某个值的一个取值以及该取值对应的映射   与ResultMap相似
  * 属性:
    * value
    * type
    * results 一个Results的数组,
* @Results | 方法 | resultMap
  * 一个结果映射, 指定了对某个特定结果列, 映射到某个属性或字段的方法,  3.5.4开始, 可重复注解
  * 属性:
    * value  是一个Result注解的数组
    * id  是结果映射的名称
* @Result | N/A | result   id
  * 在列和属性或字段之间的单个结果映射
  * 属性:
    * id    与XML id相似
    * column
    * javaType
    * jdbcType
    * typeHandler
    * one    一个关联 和 association 类似
    * many   集合关联 和 collection 类似
* @One | N/A | association
  * 负责类型的单个属性映射
  * 属性:
    * select 指定可加载合适类型实例的映射语句(也就是映射器方法) 全限定名
    * fetchType  指定在该映射中覆盖全局配置参数 lazyLoadingEnabied
    * resultMap
    * columnPrefix
* @Many | N/A | collection
  * 属性:
    * select
    * fetchType
    * resultMap
    * columnPrefix
* @MapKey | 方法 |
  * 供返回值为Map的方法使用的注解.  他是用对象的某个属性座位key, 将对象List转化为Map.
  * 属性:
    * value 指定座位Map的Key值的属性名
* @Options | 方法 | 映射语句的属性
  * 该注解允许你指定大部分开关和配置选项, 通常在映射语句上作为属性出现.
  * 提供了一致, 清晰的方式来指定选项
  * 注意: Java注解无法指定null值,因此, 一旦使用了Options注解, 语句就会被属性的默认值影响.
  * 属性:
    * userCache=true
    * flushCache=FlushCachePolicy.DEFAULT
    * resultSet=DEFAULT
    * statementType=PREPARED
    * fetchSize=-1
    * timeout=-1
    * useGeneratedKeys=false
    * keyProperty=""
    * keyColumn=""     只在部分数据库中有效, 如 Oracle 和 PostgreSQL
    * resultSets=""
    * databaseId=""
* @Insert @Update @Delete @Select | 方法 | insert update delete select
  * 分别代表将会执行的SQL语句.
  * 用字符串数组(或单个字符串)作为参数.
  * 如果传递字符串数组, 字符串数组会被连接成单个完整的字符串, 每个字符串之间加入一个空格. 以避免"丢失空格"问题
  * 属性 :
    * value 指定用来组成单个SQL语句的字符串素组
    * databaseId:  3.5.5
* @InsertProvider @UpdateProvider @DeleteProvider @SelectProvider | 方法 | insert update delete select
  * 允许构建动态SQL,
  * 没看懂
* @Param | 参数| N/A
  * 如果你的映射方法接受多个参数, 就可以使用这个注解自定义每个参数的名字. 否则在默认情况下, 出RowBounds以外的参数会以"param"加参数位置被命名. 例如: #{param1},#{param2}. 如果使用了 @param("person"), 参数就会被命名为 #{person}
* @SelectKey | 方法 | selectKey
  * 与XML selectKey 完全一致, 只能在 @Insert , @InsertProvider , @Update 或 @UpdateProvider标注的方法上只用, 否则会被忽视.
  * 标注了@SelectKey注解, Mybatis将忽视@Options注解所设置的生成主键或设置(configuration)属性.
  * 属性:
    * statement 以字符串数组形式指定将被执行的SQL语句
    * keyProperty 执行座位参数传入的对象对应属性的名称, 该属性将会更新成新的值
    * before    true/false  指明SQL应该在插入语句之前还是之后执行
    * resultType 指定keyProperty的Java类型
    * statementType  用于选择语句类型, 默认值 PREPARED
    * databaseId
* @ResultMap | 方法| N/A
  * 为@Select 或 @SelectProvider注解自定XML映射中`<resultMap>`元素的id
* @ResultType
  *
* @Flush | 方法 | N/A
  * 定义Mapper接口中的方法能够调用 SqlSession#flushStatements()方法 3.3以上可用

## 动态SQL

### if

### choose , when , otherwise    相当于switch

### trim , where, set

```xml
<select id="find" resultType="Blog">
SELECT * FROM BLOG
<where>
    <if test="state != null">
        state = #{state}
    </if>
    <if test="title != null">
        AND title like #{title}
    </if>
</where>
</select>
```

where子句只会在子元素返回任何内容的情况下才插入 WHERE子句, 而且 若子句的开头为 AND 或 OR , where元素会将他们去掉

trim  自定义 where 子句

set 动态解决更新语句的问题 , 会删除额外的逗号

```xml
<update id="update">
UPDATE Auther
<set>
    <if test="uername != null">username=#{username},</if>
    <if test="password != null">password=#{password},</if>
    <if test="email != null">email=#{email},</if>
    <if test="bio != null">bio=#{bio}</if>
</set>
WHERE id = #{id}
</update>
```

### foreach 对集合进行遍历

```xml
<select id="select" resultType="Post">
    SELECT * FROM POST P WHERE ID IN
    <foreach item="item" index="index" collection="list" open="(" separator="," close=")">
        #{item}
    </foreach>
</select>
```

可以使用任何可迭代的对象, List, Set Map 或者数组对象.
当可迭代对象时: index是当前迭代的序号, item是本次获取到的元素
当使用Map对象 或 Map.Entry对象的集合 时: imdex是键, item是值

### script 注解中使用动态SQL

### bind 允许在 OGNL表达式以外创建一个变量, 并将其绑定到当前的上下文

```xml
<select id="select" resultType="Blog">
    <bind name="pattern" value="'%' + _parameter.getTitle() + '%'">
    SELECT * FROM BLOG WHERE title LIKE #{pattern}
</select>
```

### 多数据的支持   _databaseId == 'db2'

## 静态SQL

### 缓存

内置的事务性查询缓存机制,  默认使用本地缓存, 全局的二级缓存需要配置

* 映射语句文件中的所有 select 语句的结果将会被缓存
* 映射语句文件中的所有 insert , update 和 delete 语句会刷新缓存
* 缓存会使用最近最少使用算法, 来清除不需要的缓存
* 缓存不会定时刷新, 即没有刷新间隔
* 缓存会报存列表或对象的1024个引用
* 缓存会被视为读/写缓存, 获取到的对象并不共享, 可以安全的被调用者修改, 而不干扰其他调用者或县城所做的潜在修改

缓存只作用于 cache 标签所在的映射文件中的语句, 如果混合使用 Java API 和 XML 映射文件, 在共享几口中的语句将不会被默认缓存, 需要使用 @CacheNamespaceRef 注解指定缓存作用域

## 入门

### 安装

```xml
<dependency>
 <groupId>org.mybatis</groupId>
 <artifactId>mybatis</artifactId>
 <version>3.5.4</version>
</dependency>
```

### 从XML中构建 SqlSessionFactory

每个MyBatis的应用都以一个 SqlSessionFactory 的实例为核心. 他的实例可以通过 SqlSessionFactoryBuilder 获得. SqlSessionFactoryBuilder 可以通过 XML配置文件 或 一个预先配置的 Configuration 实例来构建出 SQLSessionFactory

### 不使用XML构建 SqlSessionFactory

### 从SqlSessionFactory中获取SqlSession

## XML配置

3.4.2 启用默认值:

org.apache.ibatis.parsing.PropertyParser.enable-default-value true启动默认值特性

## XML映射文件

SQL映射文件的顶级元素

* cache - 该命名空间的缓存配置
* cache-ref - 引用其他命名空间的缓存配置
* resultMap - 描述如何从数据库结果集中加载对象, 是最复杂也是最强大的元素
* sql - 可被其他语句引用的可重用语句块
* insert - 映射插入语句
* update - 映射更新语句
* delete - 映射删除语句
* select - 映射查询语句

### select

| 属性          | 描述                                                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | 在命名空间中唯一的标识符, 可以被用来引用这条语句                                                                                                                             |
| parameterType | 将会传入这条语句的参数的类全限定名或别名. 可选, 因为MyBatis可以通过类型处理器(TypeHandler)推断出具体传入语句的参数, 默认值为未设置(unset)                                    |
| resultType    | 期望从这条语句中返回结果的类全限定名或别名. 注意,如果返回的是集合,应该设置集合包含的类型,而不是集合本身的类型化. resultType和resultMap之间只能同时用一个                     |
| resultMap     | 对外部resultMap的命名引用. 结果映射!!!!                                                                                                                                      |
| flushCache    | 将其设置为true后, 只要语句被调用, 都会导致本地缓存和二级缓存被清空, 默认:false                                                                                               |
| useCache      | 将其设置为true后,将会导致本条语句的结果被二级缓存缓存起来, 默认对于select元素是true                                                                                          |
| timeout       | 在抛出异常之前,驱动程序等待数据库返回请求结果的描述. 默认:未设置                                                                                                             |
| fetchSize     | 给驱动的建议值, 尝试让驱动程序每次批量返回的结果行数等于这个设定值, 默认:未设置                                                                                              |
| statementType | 可选:STATEMENT, PREPARED 或 CALLABLE. 让Mybatis分别使用Statement, PreparedStatement或CallableStatement, 默认:PREPARED                                                        |
| resultSetType | FORWARD_ONLY,SCROLL_SENSITIVE,SCROLL_INSENSITIVE或DEFAULT中的一个, 默认未设置                                                                                                |
| databaseId    | 如果设置了数据库厂商标识(databaseIdProvider), Mybatis会加载所有不带databaseId或匹配当前databaseId的语句; 如果带和不带的语句都有, 则不带的会被忽略 ??小朋友你是不是有很多问号 |
| resultOrdered | 仅针对select语句;true:将会假设包含了嵌套结果或是分组, 当返回一个朱结果行时, 将不会产生对当前结果集的引用. 这就是的获取嵌套结果集的时候不至于内存不够用, 默认false            |
| resultSets    | 仅适用于多结果集的情况. 将列出语句执行后返回的结果集并赋予每个结果集一个名称, 多个名称之间以逗号分隔                                                                         |

### insert, update 和 delete

| 属性             | 描述                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| id               | 命名空间中唯一标识符                                                                                                                       |
| parameterType    | 可选                                                                                                                                       |
| flushCache       | 执行就清空缓存  , 针对insert,upate,delete语句默认true                                                                                      |
| timeout          | 默认未设置                                                                                                                                 |
| statementType    |
| useGeneratedKeys | 适用于insert和update, 令Mybatis使用JDBC的getGeneratedKeys的方式来取出数据库内部生成的主键 默认false                                        |
| keyProperty      | 适用于insert和update, 指定能够唯一识别对象的属性, Mybatis会使用getGeneratedKeys的返回值或insert语句的selectKey子元素设置他的值, 默认未设置 |
| keyColumn        | 仅适用于insert和update, 设置生成建和表中的列名,                                                                                            |
| databaseId       |

### selectKey

| 属性          | 描述                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| keyProperty   | selectKey语句结果应该被设置到的目标属性  ,如果生成列不止一个,可以用逗号分隔多个属性名称                                          |
| keyColumn     | 返回结果集中生成列属性的列名,                                                                                                    |
| resultType    | 结果的类型, 通常Mybatis可以推断出来                                                                                              |
| order         | 可以设置 BEFORE 或 AFTER , BEFORE, 首先会生成主键, 设置keyProperty在执行插入语句. AFTER, 先执行插入语句, 然后是selectKey中的语句 |
| statementType |

### sql

定义可复用的SQL代码片段

### 参数

语法:   #{}

### 字符串替换

语法:   ${}   不会修改或转移该字符串

会导致SQL注入攻击!!

### 结果映射 resultMap

* constructor 用于在实例化类时, 注入结果到构造方法中
  * idArg ID参数 标记出座位ID的结果可以帮助提高整体性能
  * arg - 将被注入到构造方法的一个普通结果
* id 一个ID结果; 标记出座位ID的结果可以帮助提高整体性能
* result - 注入到字段或JavaBean属性的普通结果
* asscciation - 一个复杂属性的关联; 许多结果将包装成这种类型
  * 嵌套结果映射 - 关联可以是 resultMap元素, 或是其他结果映射的引用
* collection - 一个复杂的合集
  * 嵌套结果映射 - 关联可以是 resultMap元素, 或是其他结果映射的引用
* discriminator - 使用结果值来决定使用哪个resultMap
  * case - 基于某些值的结果映射
    * 嵌套结果映射 - case 可是一个结果映射, 因此具有相同的结构和元素; 或者引用其他的结果映射

| 属性        | 描述                                                             |
| ----------- | ---------------------------------------------------------------- |
| id          | 当前命名空间中的一个唯一标识, 用于标识一个结果映射               |
| type        | 类的完全限定名, 或者一个类的别名                                 |
| autoMapping | 如果设置, Mybatis 将会为本结果映射开启或关闭自动映射, 默认未设置 |

### id & result

是结果映射的基础, 都将一个列的值映射到一个简单数据类型的属性或字段. 不同是, id 对应的属性会被标记为对象的标识符, 在比较对象实例时使用, 可以提高整体性能

| 属性        | 描述                                  |
| ----------- | ------------------------------------- |
| property    | 映射到列结果的字段或属性              |
| column      | 数据库中的列名                        |
| javaType    | 一个java类的全限定名, 或一个类别别名. |
| jdbcType    | JDBC类型,                             |
| typeHandler | 类型处理器,                           |

### 支持的JDBC类型

| JDBC类型      | 对应Java类型         | 说明                             |
| ------------- | -------------------- | -------------------------------- |
| VARCHAR       | java.lang.String     |
| CHAR          | java.lang.String     |
| CLOB          | java.lang.String     |
| LONGVARCHAR   | java.lang.String     |
| BINARY        | byte[]               |
| BLOB          | byte[]               |
| LONGVARBINARY | btye[]               |
| VARBINARY     | byte[]               |
| --- ---       |
| BIT           | java.lang.Boolean    |
| TINYINT       | java.lang.Byte       |                                  |
| SMALLINT      | java.lang.Integer    |                                  |
| BOOLEAN       | java.lang.Integer    |
| INTEGER       | java.lang.Long       |
| BIGINT        | java.math.BigInteger |
| REAL          | java.lang.Float      |
| DOUBLE        | java.lang.Double     |
| FLOAT         | java.lang.Double     |
| DECIMAL       | java.math.BigDecimal |
| NUMERIC       | java.math.BigDecimal |
| OTHER         | java.lang.Object     |
| --- ---       |
| DATE          | java.sql.Date        | LocalDate                        |
| TIME          | java.sql.Time        | LocalTIme                        |
| TIMESTAMP     | java.sql.Timestamp   | LocalDateTime                    |
| ARRAY         | java.sql.Connection  |
| NCHAR         |                      | 指定长度, 数据不满, 在后面补空格 |
| CURSOR        |                      | Oracle的游标                     |
| NCLOB         |
| NULL          |
| NVARCHAR      |
| UNDEFINED     |

## 简介

* 持久层 DAO
