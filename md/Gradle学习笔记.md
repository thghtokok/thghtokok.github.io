# Gradle 的学习笔记

* 《Gradle 中文完整版》

## 第二部分 掌握基本原理

### 第五章 依赖管理

#### 5.6 理解本地依赖缓存

##### 5.6.1 分析缓存结构 P127

#### 5.5 使用和配置仓库

Gradle 项目的仓库类型

| 类型           | 描述                                                             |
| -------------- | ---------------------------------------------------------------- |
| Maven 仓库     | 本地文件系统或远程服务器中的Maven仓库，或者预配置的Maven Central |
| lvy仓库        | 本地文件系统或远程服务器中的lvy仓库， 具有特定的结构模式, P126   |
| 扁平的目录仓库 | 本地文件系统中的仓库， 没有元数据支持,P126                       |

##### 5.5.1 理解仓库API表示

* 在项目中定义仓库的关键是 RepositoryHandler接口

##### 5.5.2 Maven 仓库

* RepositoryHandler接口提供了两个方法来预配置Maven仓库
* mavenCentral() 方法用来将Maven Central引用添加到一系列仓库中。
* mavenLocal() 方法用来在文件系统中关联一个本地Maven仓库
* 添加预配置的Maven Central仓库
* 添加预配置的本地Maven仓库
* 添加一个自定义的Maven仓库

```java
repositories {
    // 添加Maven Central仓库
    mavenCentral()
    // 添加本地Maven仓库
    mavenLocal()
    // 添加自定义的Maven仓库
    maven {
        name 'Custom Maven Repository',
        url 'http://repository-gradle-in-action.forge.cloudbees.com/release/'
    }
}
```

#### 5.4 声明依赖

| 类型             | 描述                                       |
| ---------------- | ------------------------------------------ |
| 外部模块依赖     | 依赖仓库中的外部类库, 包括它所提供的元数据 |
| 项目依赖         | 依赖其他Gradle项目                         |
| 文件依赖         | 依赖文件系统中的一系列文件                 |
| 客户端模块依赖   | 依赖仓库中的外部类库, 具有声明元数据的能力 |
| Gradle运行时依赖 | 依赖GradleAPI或者封装Gradle运行时的类库    |

##### 5.4.1 理解依赖API表示

##### 5.4.2 外部模块依赖

* 依赖属性
  * group: 标识一个组织、公司或项目
  * name： 一个工件的名称唯一地描述了依赖
  * version：
  * classifier：用来区分具有相同group、name和version属性的工件，但需要进一步规范
* 依赖标记
  * dependencyNotation1 : org.hibernate:hibernate-core:3.6.3-Final
    * group:name:version
  * Gradle 没有默认仓库, 没有配置仓库的时候会报错
* 检查依赖报告
  * gradle dependencies
  * 标有星号的依赖被排除了，依赖管理器选择的是相同的或者另一个版本的类库，因为被声明作为另一个顶层依赖的传递依赖
  * 针对版本冲突，Gradle默认解决策略是获取最新的版本，以箭头(->)表示
* 排除传递性依赖
  * exclude 排除属性与常用的依赖标记略有不同.
    * 可以使用group 和 /或module属性
    * gradle 不允许你只排除某个特定版本的依赖, 故version属性是不可用的
  * transitive 排除所有的传递性依赖
* 动态版本声明
  * 使用占位符 latest.integration 使用最新版本呢的依赖, 或者, 声明版本属性时, 通过加号(+)标定动态改变
  * 少用或者不用。
    * 可靠和可重复的构建很重要
    * 可能在不知情的情况下引入不兼容的类库版本和副作用

```java
// 动态版本声明

dependencies {
    // 使用 加号
    cargo 'org.codehaus.cargo:cargo-ant:1.+'
    // 使用 latest-integration
    cargo 'org.codehaus.cargo:cargo-ant:latest-integration'
}

// 排除一个依赖

dependencies {
    cargo ('org.codehaus.cargo:cargo-ant:1.3.1') {
        // 通过快捷或map标记来声明排除依赖
        exclude group: 'xml-apis', module: 'xml-apis'
    }
    cargo 'xml-apis:xml-apis:2.0.2'
    cargo ('org.codehaus.cargo:cargo-ant:1.3.1') {
        // 排除所有的传递性依赖
        transitive = false
    }
}

dependencies {
    configurationName dependencyNotation1, dependencyNotation1, ...
}
// 例子

ext.cargoGroup = 'org.codehaus.cargo'
ext.cargoVersion = '1.3.1'

dependencies {
    // 依赖声明使用map形式包含group,name和version属性
    cargo group:cargoGroup, name: 'cargo-core-uberjar', version: cargoVersion
    // 以字符串形式快捷声明依赖
    cargo "$cargoGroup:cargo-ant:$cargoVersion"
}

```

##### 5.4.3 文件依赖

```java
//将Cargo依赖拷贝到本地文件系统中
task copyDependenciesToLocalDir(type: Copy){
    // Gradle API 提供的语法糖；
    // 如同调用 configurations.getByName('cargo').asFileTree
    from configurations.cargo.asFileTree
    into "${System.properties['user.home']}/libs/cargo"
}

// 声明文件依赖
dependencies {
    cargo fileTree(dir: "${System.properties['user.home']}/libs/cargo",include:'*.jar')
}
```

#### 5.3 依赖配置

##### 5.3.1 理解配置API表示

Java插件提供了6个线程的配置: compile, runtime, testCompile, testRuntime, archives 和 default

#### 5.1 依赖管理概述

##### 5.1.1 不完善的依赖管理技术

##### 5.1.2 自动化依赖管理的重要性

* 知道依赖的确切版本
* 管理传递性依赖

##### 5.1.3 使用自动化依赖管理 P110

##### 5.1.4 自动化依赖管理的挑战

* 潜在不可用的中央托管仓库
* 坏元数据和依赖缺失

### 第四章 构建脚本概要

#### 4.2 使用task

##### 4.2.1 项目版本管理

##### 4.2.2 声明task动作 action

##### 4.2.3 访问DefaultTask属性

##### 4.2.4 定义task依赖

dependsOn 方法允许声明依赖一个或多个 task, task依赖的执行顺序, 执行顺序是不确定的

##### 4.2.5 终结器 task

* finalizedBy

```java
task first {
        doLast {
                println "first"
        }
}

task second {
        doLast {
                println "second"
        }
}

first.finalizedBy second

$ gradle first

> Task :first
first

> Task :second
second
```

##### 4.2.6 添加任意代码

```java
class ProjectVersion {
    Integer major
    Integer minor
    Boolean release
    
    ProjectVersion(Integer major, Integer minor){
        this.major = major
        this.minor = minor
        this.release = Boolean.FALSE
    }
    
    ProjectVersion(Integer major, Integer minor, Boolean release){
        this(major,minor)
        this.release = release
    }
    
    @Override
    String toString(){
        "$major.$minor${release ? '' : '-SNAPSHOT'}"
    }
}
```

##### 4.2.7 理解 task 配置

#### 4.1 构建块

每个Gradle构建都包含三个基本构建块: project, task 和 property, 每个构建至少包含一个project, 进而又包含一个或多个task. project和task暴露的属性可以用来控制构建

##### 4.1.3 属性

* 扩展属性 ext 命名空间
* Gradle 属性 可以通过在 gradle.properties 文件中声明直接添加到项目中, 这个文件位于 `<USER_HOME>/.gradle` 目录或项目的根目录下
* 声明属性的其他方式
  * 项目属性通过 -P 命令行选项提供
  * 系统属性通过 -D 命令行选项提供
  * 环境属性按照下面的模式提供
    * ORG_GRADLE_PROJECT_propertyName=someValue

```java
// gradle.properties文件中声明
aaa = abc
sss = 123

// 访问项目中的两个变量
assert project.aaa == 'abc'
task printGradleProperty {
    doLast {
        println "Second property: $sss"
    }
}


// 只在初始声明扩展属性时需要使用 ext 命名空间
project.ext.myProp = 'myValue'
ext{
    xxxx = 111
}

// 使用 ext 命名空间访问属性是可选的
assert myProp == 'myValue'
println project.xxxx
ext.xxxx = 223
```

##### 4.1.2 任务 task

* 重要功能: 任务动作 task action , 任务依赖 task dependency

```java
interface Task

// task依赖
dependsOn(task: Object...)

// 动作定义
doFirst(action: Closure)
doLast(action: Closure)
getActions()

// 输入/输出数据声明
getInputs()
getOutputs()

// getter/setter 属性
getAnt()
getDescription()
getEnabled()
getGroup()
setDescription(description: String)
setEnabled(enabled: boolean)
setGroup(group: String)
```

##### 4.1.1 项目 project

* 一个project代表一个正在构建的组件(比如JAR文件), 或一个想要完成的目标
* build.gradle 相当于 Maven pom.xml
* 每个Gradle构建脚本至少定义一个项目
* 当构建进程启动后, Gradle基于build.gradle中的配置实例化 org.gradle.api.Project类, 并且能够通过project变量使其隐式可用.
* 一个project可以创建新的task, 添加依赖关系和配置, 并应用插件和其他的构建脚本.

```java
interface Project

// 构建脚本配置
apply(options: Map<String,?>)
buildscript(config: Closure)

// 依赖管理
dependencies(config: Closure)
configurations(config: Closure)
getDependencies()
getConfigurations()

// getter/setter属性
getAnt()
getName()
getDescription()
getGroup()
getPath()
getVersion()
getLogger()
setDescription(description: String)
setVersion(version: Object)

// 创建文件
file(path: Object)
files(path: Object...)
fileTree(baseDir: Object)

// 创建task
task(args: Map<String,?>, name: String)
task(args: Map<String,?>, name: String, c:Closure)
task(name: String)
task(name: String, c:Closure)
```

## 第一部分 核心概念和特性

### 通过范例学习构建 Gradle 项目

* 源代码的位置， 默认在 src/main/java 目录下查找
* 构建项目： gradle build
* build.gradle 文件
  * version = 0.1  定义项目版本
  * sourceCompatibility = 1.8 设置Java版本
  * 修改项目的默认结构
* 配置和使用外部依赖
  * 定义仓库 repositories
  * 定义依赖 dependencies
    * compile
  * 解析依赖

```gradle
// 定义仓库
repositories {
    mavenCentral()    
}

// 定义依赖
dependencies {
    compile group:'org.apache.commons',name:'commons-lang3',version:'3.1'
}

sourceSets {
    main { //用不同目录的列表代替约定的源代码目录
        java {
            srcDirs = ['src']
        }
    }
    test {  // 用不同目录的列表代替约定的测试代码目录
        java {
            srcDirs = ['test']  
        }
    }
}
buildDir = 'out'  // 项目输出路径到out目录
```

## 下一代构建工具: Gradle

### 使用 Gradle 的命令行

* Gradle 守护进程

守护进程以后台进程方式运行Gradle， gradle命令会重用守护进程，避免启动时造成的开销。

* 启动守护进程
  * gradle --daemon
  * 貌似新版本似乎都会启动一个守护进程， 即使不加这个参数

* 命令行选项
  * -?, h, --help : 打印出所有可用的命令行选项, 包含描述信息
  * -b, --bulid-file : Gradle 构建脚本的默认命名约定是build.gradle.
    * 使用这个命令行选项可以执行一个特定名字的构建脚本
      * gradle -b test.gradle
  * --offline : 通常, 构建中声明的依赖必须在离线仓库中存在才可用.
    * 如果这些依赖在本地缓存中没有, 那么运行在一个没有网络连接环境中的构建都会失败.
    * 使用这个选项可以以离线模式运行构建, 仅仅在本地缓存中检查依赖是否存在.
  * 参数选项
    * -D, --system-prop : Gradle是以一个JVM进行运行的.
      * 和所有的Java进程一样, 你可以提供一个系统参数, 如 -Dmyprop=myvalue这样
    * -P, --project-prop : 项目参数是构建脚本中可用的变量.
      * 用来直接向构建脚本传入参数 如: -Pmyprop=myvalue
  * 日志选项
    * -i, --info : 在默认设置中, Gradle不会提供大量的输出信息.
      * 可用来将Gradle的日志级别改变到INFO获得更多信息
    * -s, --stacktrace : 如果构建在运行中出现错误, 此选项在有异常抛出时会打印出极短的堆栈跟踪信息.
    * -q, --quiet : 减少构建出错时打印出来的错误日志信息
  * 帮助任务
    * tasks : 显示项目中所有可能运行的 task, 包括描述信息.
      * 项目中应用的插件可能提供一些额外的 task.
    * properties : 显示出项目中所有可用的属性
      * 某些属性由Gradle的project对象提供, project对象时一个构建的本质表现形式.
      * 其他属性都是用户定义的, 来自属性文件、命令行选项或在构建脚本中定义的

* 任务执行
  * gradle 任务1 任务2
    * 会先执行任务1 然后在执行任务2
    * gradle yayGradle0 helloWorld
  * 任务名字缩写
    * 以驼峰式命名, 任务名字的缩写必须是唯一的
    * gradle yG0 hW
  * 在执行时排除一个任务
    * gradle gT -x yG0
    * yG0 被排除了

* 列出项目中所有可用的task
  * 要运行一个task, 需要知道task的名字
  * gradle -q tasks
  * gradle -q tasks --all
    * 是决定task执行顺序的好方法, 和书上显示的不一样

```shell
~$ gradle gT -x yG0

> Task :yayGradle1
Gradle rocks

> Task :yayGradle2
Gradle rocks

BUILD SUCCESSFUL in 773ms
2 actionable tasks: 2 executed
```

```shell
$ gradle -q tasks

------------------------------------------------------------
Tasks runnable from root project 'guohaitao'
------------------------------------------------------------

Build Setup tasks
-----------------
init - Initializes a new Gradle build.
wrapper - Generates Gradle wrapper files.

Help tasks
----------
buildEnvironment - Displays all buildscript dependencies declared in root project 'guohaitao'.
dependencies - Displays all dependencies declared in root project 'guohaitao'.
dependencyInsight - Displays the insight into a specific dependency in root project 'guohaitao'.
help - Displays a help message.
javaToolchains - Displays the detected java toolchains. [incubating]
outgoingVariants - Displays the outgoing variants of root project 'guohaitao'.
projects - Displays the sub-projects of root project 'guohaitao'.
properties - Displays the properties of root project 'guohaitao'.
tasks - Displays the tasks runnable from root project 'guohaitao'.

To see all tasks and more detail, run gradle tasks --all

To see more detail about a task, run gradle help --task <task>
```

```shell
~$ gradle -q tasks --all

------------------------------------------------------------
Tasks runnable from root project 'guohaitao'
------------------------------------------------------------
# 和上面那个输出相同

Other tasks
-----------
components - Displays the components produced by root project 'guohaitao'. [deprecated]
dependentComponents - Displays the dependent components of components in root project 'guohaitao'. [deprecated]
groupTherapy
model - Displays the configuration model of root project 'guohaitao'. [deprecated]
prepareKotlinBuildScriptModel
startSession
yayGradle0
yayGradle1
yayGradle2
```

### 初体验

* 是基于JVM构建工具
* 引人注目的特性集
  * 可表达性的构建语言和底层API
  * Gradle 就是 Groovy    有时间去看看 Groovy
  * 灵活的约定
  * 鲁棒和强大的依赖管理
  * 可扩展的构建
  * 轻松的可扩展性
  * 和其他构建工具继承
  * 社区和公司的推动
  * 锦上添花: 额外的特性

> 书里写的 `<<` 已经被高版本的 gradle 抛弃了. 报了错
> Could not find method leftShift() for arguments [build_6mdpyluu1t6hx1f4yiavnhe2w$_run_closure1@39987388] on task ':startSession' of type org.gradle.api.DefaultTask.

```gradle
task startSession {
    doLast {
        chant()
    }
}

def chant() {
    ant.echo( message: 'Repeat after me...' )
}

3.times {
    task "yayGradle$it" {
        doLast {
            println 'Gradle rocks'
        }
    }
}

yayGradle0.dependsOn startSession
yayGradle2.dependsOn yayGradle1, yayGradle0
task groupTherapy ( dependsOn: yayGradle2 )
```

```shell
$ gradle  groupTherapy

> Task :startSession
[ant:echo] Repeat after me...

> Task :yayGradle0
Gradle rocks

> Task :yayGradle1
Gradle rocks

> Task :yayGradle2
Gradle rocks

BUILD SUCCESSFUL in 1s
4 actionable tasks: 4 executed
```

## Gradle 介绍

* 没有自动化的工作, 都是重复, 单调和易犯错的
* 不同类型的项目自动化:
  * 按需构建, 预定构建和触发构建, 他们是互补的
