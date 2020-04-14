# SpringCloud学习笔记

* 《疯狂Spring Cloud微服务框架实战》

## 第四章 负载均衡 Ribbon  瑞本

负载均衡是分布式框架的重点, 负载均衡机制决定者整个服务集群的性能和稳定. 

### 4.5 RestTemplate 负载均衡 P77



### 4.4 在Spring CLoud 中使用 Ribbon

* 之前被 @LoadBalanced 修饰的 RestTemplate 实体就是有负载均衡

#### 4.4.1 准备工作 P71

* 之前已经做了

#### 4.4.2 使用代码配置Ribbon

* MyRule 实现 IPule 自定义规则
* MyPing 实现 IPing 自定义Ping
* MyConfig 生成 rule 和 ping 两个 Bean
* CloudProviderConfig 声明 Ribbon 使用 MyConfig
    * @RibbonClient 注解 配置了RibbonClient的名称 (这里应该是服务提供者的名称我这里是first-cloud-server) , 和对应的配置类

#### 4.4.3 使用配置文件设置Ribbon

```yml
cloud-provider:
    ribbon:
        NFLoadBalancerRuleClassName: xx.xx.xx.MyRule
        NFLoadBalancerPingClassName: xx.xx.xx.MyPing
        listOfServers: http://localhost:8080/,http://localhost:8081/
```

## 疑问: listOfServers 这个配置是必须的吗
  * 不是必须的, 配置了 eureka后, 会根据 服务名获取服务器列表

#### 4.4.4 Spring 使用 Ribbon 的 API

Spring Cloud 对 Ribbon 进行了封装, 可以直接使用 Spring 的 LoadBalancerClient 来处理请求以及服务选择

```java
@Autowired
private LoadBalancerClient loadBalancerClient;

@GetMapping(value = "/uselb")
public ServiceInstance uselb() {
    return loadBalancerClient.choose("first-cloud-server");
}
```

直接使用Ribbon的API

```java
    @Autowired
    private SpringClientFactory factory;


    @GetMapping(value = "defaultValue")
    public Map<String, Object> defaultValue() {
        Map<String, Object> result = Maps.newLinkedHashMap();
        ZoneAwareLoadBalancer alb = (ZoneAwareLoadBalancer) factory.getLoadBalancer("default");
        result.put("alb.IClientConfig", alb.getClientConfig().getClass().getName());
        result.put("alb.IRule", alb.getRule().getClass().getName());
        result.put("alb.IPing", alb.getPing().getClass().getName());
        result.put("alb.ServerList", alb.getServerListImpl().getClass().getName());
        result.put("alb.ServerListFilter", alb.getFilter().getClass().getName());
        result.put("alb.ILoadBalancer", alb.getClass().getName());
        result.put("alb.PingInterval", alb.getPingInterval());
        ZoneAwareLoadBalancer alb2 = (ZoneAwareLoadBalancer) factory.getLoadBalancer("first-cloud-server");
        result.put("alb2.IClientConfig", alb2.getClientConfig().getClass().getName());
        result.put("alb2.IRule", alb2.getRule().getClass().getName());
        result.put("alb2.IPing", alb2.getPing().getClass().getName());
        result.put("alb2.ServerList", alb2.getServerListImpl().getClass().getName());
        result.put("alb2.ServerListFilter", alb2.getFilter().getClass().getName());
        result.put("alb2.ILoadBalancer", alb2.getClass().getName());
        result.put("alb2.PingInterval", alb2.getPingInterval());
        return result;
    }
```

```json
{
  "alb.IClientConfig": "com.netflix.client.config.DefaultClientConfigImpl",
  "alb.IRule": "com.netflix.loadbalancer.ZoneAvoidanceRule",
  "alb.IPing": "com.netflix.niws.loadbalancer.NIWSDiscoveryPing",
  "alb.ServerList": "org.springframework.cloud.netflix.ribbon.eureka.DomainExtractingServerList",
  "alb.ServerListFilter": "org.springframework.cloud.netflix.ribbon.ZonePreferenceServerListFilter",
  "alb.ILoadBalancer": "com.netflix.loadbalancer.ZoneAwareLoadBalancer",
  "alb.PingInterval": 30,
  "alb2.IClientConfig": "com.netflix.client.config.DefaultClientConfigImpl",
  "alb2.IRule": "cn.thght.cloudinvoker.ribbon.MyRule",
  "alb2.IPing": "cn.thght.cloudinvoker.ribbon.MyPing",
  "alb2.ServerList": "org.springframework.cloud.netflix.ribbon.eureka.DomainExtractingServerList",
  "alb2.ServerListFilter": "org.springframework.cloud.netflix.ribbon.ZonePreferenceServerListFilter",
  "alb2.ILoadBalancer": "com.netflix.loadbalancer.ZoneAwareLoadBalancer",
  "alb2.PingInterval": 30
}
```


### 4.1 Ribbon介绍

* 是Netflix下的负载均衡项目, 在集群中为各个客户端的通信提供了支持. 主要实现中间层应用程序的负载均衡.有以下特性:
  * 负载均衡器, 可支持插拔式的负载均衡规则
  * 对多种协议提供支持, 如: HTTP, TCP, UDP
  * 继承了负载均衡功能的客户端

* 可与Eureka整合使用
* Ribbon子模块   三大子模块
  * ribbon-core: 核心, 包括负载均衡接口定义, 客户端接口定义, 内置的负载均衡实现等API
  * ribbon-eureka: 为Eureka客户端提供负载均衡实现类
  * ribbon-httpclient: 对Apache的HttpClient进行封装, 该模块提供了含有负载均衡功能的Rest客户端

#### 4.1.3 负载均衡器组件

* 负载均衡器主要与集群中的各个服务器进行通信,负载均衡器提供一下基本功能:
  * 维护服务器的IP , DNS 名称等信息
  * 根据特定的逻辑在服务器列表中循环
* 负载均衡器的三大子模块
  * Rule: 逻辑组件,  会决定从服务器列表中返回那个服务器实例
  * Ping: 使用定时器来确保服务器网络可以连接
  * ServerList: 服务器列表, 通过静态的配置确定负载的服务器, 也可以动态指定服务器列表. 如果动态指定, 会有后台的线程刷新该列表

### 4.2 第一个Ribbon程序 P60

#### 4.2.2 编写请求客户端

> 看到这里时一脸懵逼,  我是谁? 我在哪? 我在干啥?
> 继续往后看吧
> 按照书上的配置之后, 会发起每个服务器轮询请求

#### 4.2.3 Ribbon的配置

* 在properties文件中, 配置格式:
  `<client>.<nameSpace>.<property>=<value>`
* `<client>` : 客户名称   可省略
* `<nameSpace>` : 命名空间, 默认 ribbon
* `<property>` : 属性名

## 问题: 注释掉main方法中的配置后, 将配置写在yml中, 执行会报空指针异常
> 这个问题还没有解决, 先继续往下看

### 4.3 Ribbon 的负载均衡机制

#### 4.3.1 负载均衡器 P64

* 负载均衡器接口 (ILoadBalancer)
* 服务器列表使用 listOfServers 进行配置, 也可以使用动态更新机制
* 默认使用  RoundRobinRule 规则逻辑

#### 4.3.2 自定义负载规则

* 选择哪个服务器进行处理, 由 ILoadBalancer 接口的 chooseServer 方法决定
* IRule接口 自定义负载规则 P67

#### 4.3.3 Ribbon 自带的负载规则

* RoundRobinRule : 默认规则, 简单轮询服务器列表来选择服务器
* AvailabilityFilteringRule : 改规则会忽略一下服务器
  * 无法连接的服务器: 默认情况下, 如果3次连接失败, 该服务器会被置为"短路"状态,持续30秒; 如果再次连接失败, "短路"状态的持续时间会几何级增加
    * `niws.loadbalancer.<clientName>.connectionFailureCountThreshold` 尚需经来配置连接失败的次数
  * 并发数过高的服务器: 忽略并发数过高的服务器
    * `<clientName>.ribbon.ActiveConnectionsLimit` 设定最高并发数
* WeightedResponseTimeRule: 为每个服务器赋予一个权重值,相应时间越长, 权重值越少, 会在权重值影响下随机选择服务器
* ZoneAvoidanceRule: 以区域, 可用服务器为基础进行服务器选择. 使用Zone对服务器进行分类, 可理解为机架或者机房
* BestAvailableRule: 忽略"短路"服务器, 并选择并发数较低的服务器
* RandomRule : 随机选择服务器
* RetryRule: 含有重试的选择逻辑, 如果使用 RoundRobinRule 选择的服务器无法连接, 将会重新选择服务器

#### 4.3.4 Ping机制

* 每个一段时间, 回去Ping服务器, 判断服务器是否存活
* 由IPing接口的实现类负责, 单独使用Ribbon, 默认情况下, 不会激活Ping机制
* 默认实现类  DummyPing

* 两个重要的配置
  * `<clientName>.ribbon.NFLoadBalancerPingClassName` :配置IPing的实现类
  * `<clientName>.ribbon.NFLoadBalancerPingInterval` :配置Ping操作的时间间隔

#### 4.3.5 自定义Ping P70

* 实现IPing接口, 再通过配置来设定具体的实现类

```java

public class MyPing implements IPing{
    public boolean isAlive(Server server){
        System.out.println("这是自定义Ping实现类: " + server.getHostPort());
        return true;
    }
}

```

#### 4.3.6 其他配置

* NFLoadBalancerClassName: 指定负载均衡器的实现类, 可以配置自己的负载群衡器
* NIWSServerListClassName: 服务器列表处理类, 用来维护服务器列表, Ribbon已经实现动态服务器列表
* NIWSServerListFilterClassName: 用于处理服务器列表拦截





## 第三章 微服务发布与调用  Eureka

### 3.5 Eureka的常用配置

#### 3.5.1 心跳检测配置 P55

* eureka.instance.leaseRenewalIntervalInSeconds 心跳周期时间 默认30秒
* eureka.instance.leaseExpirationDurationInSeconds 停止心跳确认死亡时间 默认90秒
* eureka.server.eviction-interval-timer-in-ms 清理注册表周期时间 默认60秒 单位毫秒
* eureka.server.enable-self-preservation 自我保护模式,不会被剔除 true开启

#### 3.5.2 注册表抓取间隔

* eureka.client.registryFetchIntervalSeconds 默认30秒 抓取注册表间隔 注意性能和实时性的权衡

#### 3.5.3 配置与使用原数据

* 自带原数据   实例ID, 主机名称, IP地址等
* eureka.instance.metadata-map 自定义原数据并提供给其他客户端使用
  * 除非客户端知道这些原数据的含义, 否则不会有影响
  * P56 详见

```yml
eureka:
    instance:
        hostname: localhost
        metadata-map:
            company-name: crazyit
```

```java
@autowired
private DiscoveryClient discoveryClient;

@GetMapping(value="/router")
public String router(){
    // 查询服务实例
    List<ServiceInstance> ins = discoveryClient.getInstances("heart-beat-client");
    //遍历实例并输出元数据值
    for(ServiceInstance service: ins){
        System.out.println(service.getMetadata().get("company-name"));
    }
    return "";
}
```

#### 3.5.4 自我保护模式



### 3.4 服务实例的健康自检   详见后面的 Actuator 模块

* 每个30秒发送一次心跳,  有时候, 有心跳, 但实际服务不可用

#### 3.4.2 使用Spring Boot Actuator

修改服务提供者

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

## 问题: /health  访问404
* 解决: 访问地址应该是 http://localhost:8080/actuator/health 

#### 3.4.3 实现应用健康自检

* 实现 HealthIndicator @Component 实现健康检查  指示器
* 实现 HealthCheckHandler   @Component  实现健康检查处理器向服务器反映情况


### 3.3 Eureka 集群搭建

#### 3.3.1 一台电脑模拟多台服务器的方法

> 修改C:\Windows\System32\drivers\etc\hosts文件
> 127.0.0.1	springcloud1 springcloud2

#### 3.3.2 改造服务器端

1. 修改配置文件 : 添加多个服务配置
2. 修改启动类 : 添加控制台输入 , 应该是学习用临时措施, 生产上没必要这样

#### 3.3.3 改造服务提供者

1. 修改配置文件  添加多个Eureka服务器地址
2. 修改启动类   不同的端口号 生产上的时候, 端口号一致

#### 3.3.4 改造服务调用者

* 修改配置文件
  * defaultZone: 添加多个Eureka服务器地址




### 3.2 第一个Eureka应用
####  3.2.5 程序结构 P43

####  3.2.4 服务调用者 P40

```java
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
```
* RestTemplate spring-web模块 主要用来调用REST服务, 本身不具备分布式服务的能力
* 但是Bean被 @LoadBalanced 注解修饰后, 这个实力就具有访问分布式服务的能力, 详见负载均衡

* 通过服务名称进行调用

* @EnableDiscoveryClient 注解使得服务调用者有能力去Eureka中发现服务.
  * @EnableEurekaClient注解包含了 @EnableDiscoveryClient的功能

* 关闭Eureka服务后, 服务调用者和服务提供者还是可以正常调用, 因为各服务本地都有一份路由备份

#### 3.2.3 服务提供者 P38

## 问题1: 为啥服务提供者没有在 Eureka服务上注册?
解决: 我靠!!!!!!要注意导入的包是否正确啊!!!

```xml
<!-- Eureka客户端配置 正确的包-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

## 问题2: Eureka服务器报错

* 现象: 
```java
Request execution error. endpoint=DefaultEndpoint{ serviceUrl='http://localhost:8761/eureka/}
```
* 相关文档
  * [文档1](https://blog.csdn.net/sinat_38364990/article/details/86503994)
    > 文章里说, 报错原因是配置关键字找不到使用了默认地址
    > 配置文件中, 要使用 serviceUrl , defaultZone 驼峰命名法





#### 3.2.2 服务器注册开关

Eureka服务器启动时的异常
```java
java.net.ConnectException: Connection refused: connect
com.netflix.discovery.shared.transport.TransportException: Cannot execute request on any known server
```

修改配置,不让服务器注册自己 
```yml
eureka:
    client:
        # 是否将自己的信息注册到Eureka服务器,默认值true
        register-with-eureka: false
        # 是否到Eureka服务器中抓取注册信息,默认值true
        fetch-Registry: false
```

guohaitao!1

#### 3.2.1 构建服务器 P35
```xml
// 引入Spring Cloud的依赖
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>Dalston.SR1</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka-server</artifactId>
    </dependency>
</dependencies>
```

* @EnableEurekaServer  声明是Eureka服务器

### 3.1 Eureka 介绍   服务管理框架

提供基于REST的服务, 用于服务管理
基于java的客户端组件,实现了负载均衡的功能,
主要维护各服务的列表并自动检查他们的状态
#### 3.1.2 Eureka架构
简单集群, 一个Eureka服务器, 若干服务提供者

#### 3.1.3 服务器端
服务器没有后台存储,注册的服务实例被保存在内存的注册中心, 通过心跳来保持最新状态.
客户端也是在内存中保存注册表信息, 不必经过服务端的注册中心.

#### 3.1.4 服务提供者
向服务器注册服务 提供信息, 自己的主机,端口,健康监测连接等
发送心跳给服务器
向服务器获取注册列表
#### 3.1.5 服务调用者
可以进行服务查找和调用.


## 第二章 

#### 2.4.5 热部署
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

## 第一章

* Netflix 耐特福莱克斯 网飞
Spring Cloud 基于 Spring Boot 将 Netflix 的多个框架进行封装, 并通过自动配置的方式将这些框架绑定到Spring的环境中
SpringCloud封窗了 Netflix 的一下项目:
* Eureka 尤里卡: 基于 REST 服务的分布式中间件, 用于服务管理
* Hystrix 海丝拽克斯 豪猪: 容错框架, 通过添加延迟阈值以及容错的逻辑, 控制分布式系统组件间的交互
* Feign 飞恩 假装: 一个REST客户端, 为简化Web Service客户端的开发
* Ribbon 瑞本 带子: 负载均衡框架, 
* Zuul 祖尔   : 为微服务集群提供代理、过滤、路由等功能

### Spring Cloud的主要模块
* Netflix
* Config ： 为分布式系统提供了配置服务器和配置客户端
* Sleuth 丝路丝 侦探：服务跟踪框架， 可与 Zipkin （齐普金）、Apache HTrace 和 ELK 等数据分析、服务跟踪系统进行整合，为服务跟踪、解决问题提供了便利
* Stream ： 用于构建消息驱动微服务的框架，在SpringBoot基础上，整合了Spring Integration 来连接消息代理中间件。
* Bus：连接Rabbit MQ、Kafka等消息代理的集群消息总线。