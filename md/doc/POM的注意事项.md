# POM.xml 的注意事项
## 修改了公共配置之后为啥eclipse中没变呢
* 修改了本地库的位置之后,发现eclipse中还是没有变
* ```windows -> preferences -> Maven -> user settings -> Global settings ```
* 将公共settings设为你安装的Maven目录中的conf目录中的settings.xml文件.


## 最终生成文件的名称
* 我想生成的.war名称为ROOT.war怎么办?
* ```<finalName>``` 标签
* 具体配置如下
```xml
<project>
	...
	<build>
		<finalName>ROOT</finalName>
	...
	</build>
</project>
```


## 程序的编码格式
```[ERROR] /D:/StudentFile/newMyeclipse/wxzj-pc/src/main/java/com/gust/utils/ScoreImportImp.java:[52,55] 编码GBK的不可映射字符```
* Maven才不管你在eclipse中设置的编码格式,默认是GBK
* 加入以下代码设置编码格式:
```xml
<project>
   ...
	<properties>
		<!-- 文件拷贝时的编码 -->
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<!-- 编译时的编码 -->
		<maven.compiler.encoding>UTF-8</maven.compiler.encoding>
	</properties>
   ...
</project>
```

## JDK 1.5

```
[ERROR] /D:/StudentFile/newMyeclipse/wxzj-pc/src/main/java/com/gust/utils/JsonViewUtils.java:[273,47] -source 1.5 中不支持 multi-catch 语句
[ERROR]   (请使用 -source 7 或更高版本以启用 multi-catch 语句)
```

* Maven 默认用JDK1.5去编译
* 配置以下内容,让他用JDK1.8去编译

```xml
<project>
   ...
	<build>
		...
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.2</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
		</plugins>
      ...
	</build>
   ...
</project>
```

##  eclipse 大红叉子1
```
Description	Resource	Path	Location	Type
Project configuration is not up-to-date with pom.xml. Select: Maven->Update Project... from the project context menu or use Quick Fix.	wxzj-pc		line 1	Maven Configuration Problem
```
```Maven->Update Project...```


## eclipse 大红叉子2
```
Description	Resource	Path	Location	Type
Cannot change version of project facet Dynamic Web Module to 2.3.	wxzj-pc		line 1	Maven Java EE Configuration Problem
```
1. 先把web.xml改成3.0版本的头
```  xml
<?xml version="1.0" encoding="UTF-8"?>
 <web-app  
        version="3.0"  
        xmlns="http://java.sun.com/xml/ns/javaee"  
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
        xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
```
2. ```Maven->Update Project...```


## war包里没有配置文件!!!
* war包中没有配置文档, 比如spring.xml
* maven会把main/java 中的.java文件编译为.class文件,会忽略掉非.java文件, 貌似
* 我们应该吧这些文件放到 main/resources 中.
* 如果你的文件在 包里面, 比如 com/gurt/config/xxxxx.pxxx 文件,  你就要在 main/resources 中建立一样的目录, 构件之后, 这些文件才会放到你想放的位置里

## 在eclipse中启动项目报异常
###  invalid constant type: 18
* 看看符合不符合下列情况:
   * JDK1.8
   * javassist 3.18 以下版本
* 符合, 那么做两件事. 
   1. 把 javassist 升级到3.18以上 
   2. 把 javassist 在POM配置排名提高到第一位.  
* 原因: 1.8和3.18冲突. 其他应用也有可能用到javassist, 根据maven规则, 先声明的先用.  也许有用


## 发起请求之后报错:
```
java.security.NoSuchAlgorithmException: Algorithm DiffieHellman not available
```
???
 










 # 测试本项目都需要那些包
```
[WARNING] Used undeclared dependencies found:
[WARNING]    commons-beanutils:commons-beanutils:jar:1.8.0:compile
[WARNING]    org.springframework:spring-web:jar:4.2.2.RELEASE:compile
[WARNING] Unused declared dependencies found:
[WARNING]    org.javassist:javassist:jar:3.18.1-GA:compile
[WARNING]    junit:junit:jar:4.12:test
[WARNING]    antlr:antlr:jar:2.7.7:compile
[WARNING]    aopalliance:aopalliance:jar:1.0:compile
[WARNING]    org.aspectj:aspectjrt:jar:1.8.7:compile
[WARNING]    org.aspectj:aspectjweaver:jar:1.7.2:compile
[WARNING]    com.mchange:c3p0:jar:0.9.5.2:compile
[WARNING]    commons-codec:commons-codec:jar:1.9:compile
[WARNING]    commons-collections:commons-collections:jar:3.2:compile
[WARNING]    commons-dbcp:commons-dbcp:jar:1.4:compile
[WARNING]    commons-net:commons-net:jar:3.3:compile
[WARNING]    commons-pool:commons-pool:jar:1.3:compile
[WARNING]    org.apache.commons:commons-pool2:jar:2.2:compile
[WARNING]    com.github.virtuald:curvesapi:jar:1.04:compile
[WARNING]    dom4j:dom4j:jar:1.6.1:compile
[WARNING]    net.sf.ehcache:ehcache:jar:2.7.4:compile
[WARNING]    org.hibernate.common:hibernate-commons-annotations:jar:4.0.2.Final:compile
[WARNING]    org.hibernate:hibernate-entitymanager:jar:4.2.6.Final:compile
[WARNING]    org.apache.httpcomponents:httpclient:jar:4.5.2:compile
[WARNING]    org.apache.httpcomponents:httpcore:jar:4.4.4:compile
[WARNING]    org.jboss.logging:jboss-logging:jar:3.1.0.GA:compile
[WARNING]    org.jboss.spec.javax.transaction:jboss-transaction-api_1.1_spec:jar:1.0.1.Final:compile
[WARNING]    org.slf4j:jcl-over-slf4j:jar:1.7.13:compile
[WARNING]    com.mchange:mchange-commons-java:jar:0.2.8:compile
[WARNING]    mysql:mysql-connector-java:jar:5.1.36:compile
[WARNING]    com.codeslap:persistence:jar:0.9.24:compile
[WARNING]    org.apache.poi:poi-examples:jar:3.15-beta2:compile
[WARNING]    org.apache.poi:poi-excelant:jar:3.15-beta2:compile
[WARNING]    org.apache.poi:poi-scratchpad:jar:3.15-beta2:compile
[WARNING]    javax.portlet:portlet-api:jar:2.0:compile
[WARNING]    org.slf4j:slf4j-api:jar:1.7.13:compile
[WARNING]    org.springframework:spring-aop:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-aspects:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-context-support:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-expression:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-instrument:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-instrument-tomcat:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-jms:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-messaging:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-orm:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-oxm:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework.security:spring-security-config:jar:4.0.3.RELEASE:compile
[WARNING]    org.springframework:spring-test:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-webmvc-portlet:jar:4.2.2.RELEASE:compile
[WARNING]    org.springframework:spring-websocket:jar:4.2.2.RELEASE:compile
[WARNING]    cn.microoak.myjdbc:myjdbc:jar:0.1.0:compile
[WARNING]    org.apache.poi:poi-ooxml-schemas:jar:3.15-beta2:compile
```
* 先不管那些声明了但没用到的包.
* 把那些用到了但是没有生命的包加上去,试试还有没有报错