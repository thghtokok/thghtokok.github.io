# Retrofit2 学习

[文章来源](https://www.jianshu.com/p/308f3c54abdd)

## 1. 入门

Retrofit 改造 瑞吹哦飞特

### 1.1 创建Retrofit实例

```java
Retrofit retrofit = new Retrofit.Builder().baseUrl("http://localhost:4567/").build();
```

* 创建Retrofit实例, 需要通过 Retrofit.Builder,  并调用 baseUrl 方法设置 URL

注意:

Retrofit2的BaseUrl中的路径(path)必须以 "/" 斜线 结束, 不然会抛出一个 IllegalArgumentException

* 完整的路径是不需要 "/"

### 1.2 接口定义

```java
public interface BlogService{
    @GET("blog/{id}")
    Call<ResponseBody> getBlog(@Path("id") int id);
}
// 注意, 使用 接口 而不是 类, 所以需要 Retrofit 创建一个 BlogService 的代理对象

BlogService service = retrofit.create(BlogService.class);
```

### 1.3 接口调用

```java
Call<ResponseBody> call = service.getBlog(2);
// 用法和OKHttp的call一样, 不同的是如果是Android系统回调方法在主线程

call.enqueue(new Callback<ResponseBody>(){
    @Override
    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response){
        try{
            System.out.println(response.body().string());
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    @Override
    public void onFailure(Call<ResponseBody> call,Throwable t){
        t.printStackTrace();
    }
})

```

## 2. Retrofit注解详解

22个注解, 分成三类

### 第一类: HTTP请求方法

* GET
* POST
* PUT
* DELETE
* PATCH
* HEAD
* OPTIONS

分别对应HTTP的请求方法, 都接收一个字符串表示接口Path, 与BaseUrl组成完整的URL, 不过也可以不指定结合下面@URL注解使用  
URL中可以使用变量如 {id} 并使用 @Path("id") 注解为 {id} 提供值

* HTTP

可用于替换以上7个, 以及其他扩展方法  
有三个属性: method , path, hasBody

```java
@HTTP(method = "GET", path = "blog/{id}", hasBody = false)
Call<ResponseBody> getBlog(@Path("id") int id);
```

* method 的值 retrofit 不会做处理, 要保证准确性,

### 第二类: 标记类

* 表单请求
  * FormUrlEncoded  表示请求体是一个Form表单, 如登录页的请求方式   Content-Type:application/x-www-form-urlencoded
  * Multipart  表示请求是一个支持文件上传的Form表单 Content-Type:multipart/form-data
* 标记
  * Streaming    表示响应体的数据用流的形式返回, 如果没有使用该注解, 默认会把数据全部载入内存之后你通过流获取数据也不过是读取内存中的数据, 所以如果返回的数据比较大, 就需要这个注解

### 第三类: 参数类

* 作用于方法
  * Headers   用于添加请求头
* 作用于方法参数 即 形参
  * Header 用于添加不固定值的Header
  * Body   用于非表单请求体
  * Field       用于表单字段
  * FieldMap     用于表单字段
  * Part     用于表单字段
  * PartMap     用于表单字段

Field和FieldMap与FormUrlEncoded注解配合
Part和PartMap与Multipart注解配合, 适合有文件上传的情况
FieldMap的接受类型是`Map<String,String>`,
非String类型会调用其toString方法
PartMap的默认接受类型是`Map<String,RequestBody>`,
非RequestBody类型会通过Converter转换

* Path
* Query
* QueryMap
* Url

用于URL
Query和QueryMap与Field和FieldMap功能一样
不同的是Query和QueryMap中的数据体现在URL上
而Field和FieldMap的数据是请求体, 但生成的数据形式是一样的

注1: {占位符} 和 Path 尽量只用在URL的path部分, URL中的参数使用Query和QueryMap代替, 保证接口定义的简洁
注2: Query, Field 和 Part 这三个都支持数组 和 实现了 Iterable 接口的类型  如 List, Set 等,  方便向后台传递数组

```java
Call<ResponseBody> foo(@Query("ids[]") List<Integer> ids);
// 结果: ids[]=0&ids[]=1&ids[]=2
```

## 3. Gson 与 Converter

在默认情况下 Retrofit 只支持将 HTTP 的响应体转换为 ResponseBody,  
而 Converter 就是 Retrofit 提供的 将 ResponseBody 转为 需要类型

```java
public interface BlogService {
    @GET("blog/{id}")
    Call<Result<Blog>> getBlog(@Path("id") int id);
}
```

通过GsonConverterFactory为Retrofit添加Gson支持:

```java
Gson gson = new GsonBuilder()
    // 配置Gson
    .setDateFormat("yyyy-MM-dd hh:mm:ss")
    .create();

Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("http://www.baidu.com/")
    // 添加自定义的Gson
    .addConverterFactory(GsonConverterFactory.create(gson))
    .build();
```

这样Retrofit就会使用Gson将ResponseBody转换为需要的类型

```java
@POST("blog")
Call<Result<Blog>> createBlog(@Body Blog blog);
```

被@Body注解的Blog将会被Gson转为RequestBody发送到服务器

[Gson 相关文章](https://www.jianshu.com/p/e740196225a4)

## 4. RxJava 与 CallAdapter

用 Observable 替换 Call

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("http://www.baidu.com")
    .addConverterFactory(GsonConverterFactory.create())
    .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
    // 针对rxjava2.x
    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
    .build();

// 接口设计
public interface BlogService{
    @POST("/blog")
    Observable<Result<List<Blog>>> getBlogs();
}

// 使用
BlogService service = retrofit.create(BlogService.class);
service.getBlogs(1)
    .subscribeOn(Schedulers.io())
    .subscribe(new Subscriber<Result<List<Blog>>>(){
        @Override
        public void onCompleted(){
            System.out.println("onCompleted");
        }

        @Override
        public void onError(Throwable e){
            System.out.println("onError");
        }

        @Override
        public void onNext(Result<List<Blog>> blogsResult){
            System.out.println(blogsResult);
        }
    })
```

如果想要获取到返回的Header和响应码

* 用 `Observable<Response<T>>` 替代 `Observable<T>`  retrofit2.Response
* 用 `Observable<Result<T>>` 替代 `Observable<T>`   retrofit2.adapter.rxjava.Result 其包含了 Response 实例

## 5. 自定义 Converter

Converter接口及其作用

```java
public interface Converter<F,T> {
    // 实现从 F(rom) 到 T(o) 的转换
    T convert(F value) throws IOException;

    // 用于向Retrofit提供相应Converter的工厂
    abstract class Factory {
        // 创建从ResponseBody 其他类型的 Converter, 如果不能处理返回 null
        // 主要用于对响应体的处理
        public Converter<ResponseBody,?> responseBodyConverter(Type type, Annotation[] annotations, Retrofit retrofit){
            return null;
        }

        // 创建从 自定义类型 到ResponseBody 的 Converter, 不能处理返回null
        // 主要用于对Part , PartMap , Body 注解的处理
        public Converter<?,RequestBody> requestBodyConverter(Type type,Annotation[] parameterAnnotations, Annotation[] methodAnnotations, Retrofit retrofit){
            return null;
        }

        // 用于对Field, FieldMap, Header, Path, Query, QueryMap注解的处理
        // Retrofit 对于上面的几个注解默认使用的调用的toString方法
        public Converter<?,String> stringConverter(Type type, Annotation[] annotations, Retrofit retrofit) {
            return null;
        }
    }
}

```

要从 `Call<ResponseBody>` 转为 `Call<String>`

```java
public static class StringConverter implements Converter<ResjponseBody,String>{
    public static final StringConverter INSTANCE = new StringConverter();

    @Override
    public String convert(ResponseBody value) throws IOException{
        return value.string();
    }
}

// 一个 Fractory 来向 Retrofit 注册 StringConverter

public static class StringConverterFactory extends Converter.Factory {
    public static final StringConverterFactory INSTANCE = new StringConverterFactory();

    public static StringConverterFactory create(){
        return INSTANCE;
    }

    // 只覆盖 从 ResponseBody 到 String 的转换
    @Override
    public Converter<ResponseBody,?> responseBodyConverter(Type type, Annotation[] annotations, Retrofit retrofit){
        if(type == String.class){
            return StringConverter.INSTANCE;
        }
        // 其他类型不处理, 返回null
        return null;
    }
}

// 使用Retrofit.Builder.addConverterFactory 向 Retrofit 注册我们 StringConverterFactory

Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("http://www.baidu.com/")
    // 自定义一定要放在Gson这类的Converter前面
    .addConverterFactory(StringConverterFactory.create())
    .addConverterFactory(GsonConverterFactory.create())
    .build();
```

注: addConverterFactory 有先后顺序, 当多个ConverterFactory都支持同一种类型, 只有第一个才会被使用.  GsonConverterFactory是不判断是否支持的, 如果交换顺序会因为类型不匹配而抛出异常

只要返回值类型的泛型参数是String, 就会使用StringConverter处理, 如 `Call<String>` 和 `Observable<String>`

## 6. 自定义 CallAdapter

```java
// CallAdapter接口定义及各方法的作用:
public interface CallAdapter<T> {
    // 真正数据的类型 如 Call<T> 中的 T
    // 此 T 会作为 Converter.Factory.responseBodyConverter 的第一个参数
    // 可以参照上面的自定义Converter
    Type responseType();

    <R> T adapt(Call<R> call);

    // 用于向Retrofit提供CallAdapter的工厂类
    abstract class Factory {
        // 在这个方法中判断是否是我们支持的类型, returnType 即 Call<Requestbody> 和 Observable<Requestbody>
        // RxJavaCallAdapterFactory 就是判断 returnType 是不是 Observable<?> 类型
        // 不支持时返回 null
        public abstract CallAdapter<?> get(Type returnType, Annotation[] annotations, Retrofit retrofit);

        // 用于获取泛型的参数 如 Call<Requestbody> 中 Requestbody
        protected static Type getParameterUpperBound(int index, ParameterizedType type){
            return Utils.getParamterUpperBound(index,type);
        }

        // 用于获取泛型的原始类型 如 Call<Requestbody> 中的 Call
        // 上面的 get 方法需要使用该方法
        protected static Class<?> getRawType(Type type) {
            return Utils.getRawType(type);
        }
    }
}

// 自定义 CallAdapter 以 CustomCall<String> 为例
// 自定义一个没有实际用途的Call的包装类
public static class CustomCall<R> {
    public final Call<R> call;

    public CustomCall(Call<R> call){
        this.call = call;
    }
    
    public R get() throws IOException {
        return call.execute().body();
    }
}

// 还需要CustomCallAdapter 来实现 Call<T> 到 CustomCall<T> 的转换, 
public static class CustomCallAdapter implements CallAdapter<CustomCall<?>> {
    private final Type responseType;

    // 下面的 responseType 方法需要数据的类型
    CustomCallAdapter(Type responseType){
        this.responseType = responseType;
    }

    @Override
    public Type responseType(){
        return responseType;
    }

    @Override
    public <R> CustomCall<R> adapt(Call<R> call){
        // 由 CustomCall 决定如何使用
        return new CustomCall<>(call);
    }
}

// 提供 CustomCallAdapterFactory 用于向 Retrofit 提供 CustomCallAdapter
public static class CustomCallAdapterFactory extends CallAdapter.Factory {
    public static final CustomCallAdapterFactory INSTANCE = new CustomCallAdapterFactory();

    @Override
    public CallAdapter<?> get(Type returnType, Annotation[] annotations, Retrofit retrofit){
        // 获取原型类型
        Class<?> rawType = getRawType(returnType);
        // 返回值必须是CustomCall并且带有泛型
        if(rawType == CustomCall.class && returnType instanceof ParameterizedType) {
            Type callReturnType = getParameterUpperBound(o, (ParameterizedType) returnType);
            return new CutomCallAdapter(callReturnType);
        }
        return null;
    }
}

// 使用 addCallAdapterFactory 向 Retrofit 注册 CustomCallAdapterFactory

Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("http://www.baidu.com/")
    .addConverterFactory(StringConverterFactory.create())
    .addConverterFactory(GsonConverterFactory.create())
    .addCallAdapterFactory(CustomCallAdapterFactory.INSTANCE)
    .build();
```

注: addCallAdapterFactory 与 addConverterFactory 同理, 有先后顺序

## 7. 其他说明

### 7.1 Retrofit.Builder

* callbackExecutor(Executor) 指定call.enqueue时使用的Executor, 所以该设置只对返回值为Call的方法有效
* callFactory(Factory) 设置一个自定义的 okhttp3.Call.Factory,
* client(OkHttpClient) 设置自定义的OKHttpClient, Retrofit2.0各对象各自持有不同的OkHttpClient实例, 当需要共用OkHttpClient或需要自定义时则可以使用该方法, 如: 处理Cookie, 使用stetho调试等
* validateEagerly(boolean) 是否在调用 create(class) 时检查接口定义是否正确, 而不是在调用方法才检测, 适合在开发, 测试时使用

### 7.2 Retrofit的Url组合规则

| BaseUrl                                 | 和URL有关的注解中提供的值   | 最后结果                                    |
| --------------------------------------- | --------------------------- | ------------------------------------------- |
| <<http://localhost:4567/path/to/other/> | /post                       | <http://localhost:4567/post>>               |
| <<http://localhost:4567/path/to/other/> | post                        | <http://localhost:4567/path/to/other/post>> |
| <<http://localhost:4567/path/to/other/> | <https://github.com/ikidou> | <https://github.com/ikidou>>                |

* 如果注解中提供的url是完整的url, 则url将作为请求的url

* 如果注解中提供的url是不完整的url, 且不以 / 开头, 则请求的url为baseUrl+注解中提供的值

* 如果注解中提供的url是不完整的url, 且以 / 开头, 则请求的url为baseUrl的主机部分+注解中提供的值

### 7.3 Retrofit提供的Converter

| Converter  | Gradle依赖                                       |
| ---------- | ------------------------------------------------ |
| Gson       | com.squareup.retrofit2:converter-gson:2.0.2      |
| Jackson    | com.squareup.retrofit2:converter-jackson:2.0.2   |
| Moshi      | com.squareup.retrofit2:converter-moshi:2.0.2     |
| Protobuf   | com.squareup.retrofit2:converter-protobuf:2.0.2  |
| Wire       | com.squareup.retrofit2:converter-wire:2.0.2      |
| Simple XML | com.squareup.retrofit2:converter-simplexml:2.0.2 |
| Scalars    | com.squareup.retrofit2:converter-scalars:2.0.2   |

### 7.4 Retrofit提供的CallAdapter

| CallAdapter | Gradle依赖                                  |
| ----------- | ------------------------------------------- |
| guava       | com.squareup.retrofit2:adapter-guava:2.0.2  |
| Java8       | com.squareup.retrofit2:adapter-java8:2.0.2  |
| rxjava      | com.squareup.retrofit2:adapter-rxjava:2.0.2 |
