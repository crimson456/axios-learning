lib                 
|--axios            入口
|--utils            最基本的工具方法
|                   
|--core             
|  |--Axios                             Axios类
|  |--AxiosHeaders                      AxiosHeaders类
|  |--interceptorManager                拦截器InterceptorManager类
|  |--buildFullPath                     拼接路径
|  |--dispatchRequest                   转化请求体发送请求
|  |--mergeConfig                       合并配置项
|  |--settle                            根据状态码成功或失败完成promise
|  |--AxiosError                        AxiosError类
|  |--transformData                     对请求体data进行转化
|
|--defaults                             默认配置
|  |--index                             
|  |--transitional                      
|
|--cancel                               取消请求
|  |--CancelToken                       CancelToken类
|  |--CanceledError                     
|  |--isCancel                          
|
|--adapters                             
|  |--adapters                          请求载体的获取
|  |--xhr                               浏览器端XMLHttpRequest对象
|  |--http                              ode端http.request方法
|
|--helpers                              工具函数
|  |--bind                              apply实现bind
|  |--buildURL                          合并地址和参数
|  |--conbindeURLs                      根据基础路径拼接处完整路径
|  |--HttpStatusCode                    http状态码枚举
|  |--parseProtocol                     解析url中的协议
|  |--speedometer                       流传输的速度
|  |--validator                         验证属性类型是否有效(标记一些废弃属性)
|  |--parseHeaders                      解析头部字符串成对象
|  |--AxiosTransformStream              
|  |--AxiosURLSearchParams              
|  |--cookies                           
|  |--depracatedMethod                  
|  |--formDataToJSON                    
|  |--formDataToStream                  
|  |--formDataURI                       
|  |--isAbsoluteURL                     
|  |--isAxiosError                      
|  |--isURLSameOrigin                   
|  |--null                              
|  |--readBlob                          
|  |--spread                            
|  |--throttle                          
|  |--toFormData                        
|  |--toURLEncodedForm                  
|  |--ZlibHeaderTransformStream         
|
|--platform         
|  |--              
|  |--              
|  |--              
|  |--              
|  |--              
|  |--              
|
|--env              
|  |--              
|  |--              
|  |--              
|  |--              
|  |--              
|  |--              
