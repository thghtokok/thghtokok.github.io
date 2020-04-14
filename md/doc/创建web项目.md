[信息来源](http://blog.csdn.net/xybelieve1990/article/details/52043127)

# 用Maven创建一个web项目

1. 创建Maven Project
2. Next
3. 选择```maven-archetype-webapp``` -> Next
4. 填写三要素和包 -> Finish

## 项目配置
1. 添加Source Folder
   Maven规定必须创建下面四个Source Folder
   * src/main/resources
   * src/main/java
   * src/test/resources
   * src/test/java

2. 配置Build Path
   * 右键```Build Path``` -> ```Configure Build Path...```
   * 设定4个文件夹的输出Output folder,双击修改
      * src/main/resources　　对应   　　target/classes
      * src/main/java　　对应　　target/classes
      *  src/test/resources　　对应   　　target/test-classes
      * src/test/java　　对应　　target/test-classes

3. 设定Libraries
   * JDK

4. 将项目转换成Dynamic Web Project
   * 项目右键 -> Properties
   * Project Facets -> Convert faceted from
   * 修改 java jdk 的版本
   * 

5. 如果出现 eclipse出现找不到 web.xml的提示,  project -> clean...  一下就好了