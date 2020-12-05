<template>
    <div style="min-width:1000px">
        <div id="c2">
            <div class="top-center">
                <h2>关于我们</h2>
                <p class="lead">我们的项目构成，项目介绍以及团队介绍<br>
                后期计划，团队分工</p>
            </div>
            <div class="container">
                <div class="about-us">
                  <div class="row">
                    <div class="col-md-6 col-sm-6" >
                    <h3>我们团队是</h3>
                    <p>前端工程师----江国劲，朱海城</p>
                    <p>后台工程师----蔡贤涛</p>
                    <p>UI设计师----朱海城</p>
                    <p>
                        易解是致力于为用户提供应用服务保障的服务性平台，为你提供科技易解、梗易解、词易解，及易解社区服务。平台以用户的手机、PC等便携式终端设备为载体，无论用户身在何处，都可以及时获取所有热词、热梗相关的信息。
                    </p>
                    <p>开发者邮箱：1090492603@qq.com</p>
                    </div>
                    <div class="col-md-6 col-sm-6" style="marging-left:10px">
                    <h3>项目介绍</h3>
                    <p><strong>项目的作用</strong><br>
                        易解是一款帮助用户了解网上热词、热梗，易解科技，及进行社区交流的网站。有良好的拓展性和维护性，可以轻松进行网页的改版。</p>
                    <p><strong>技术手段</strong><br>
                        结构采用了流行的element框架、vue-cli手脚架和jquery工具库,进行了PC端的屏幕适配，兼容各种主流浏览器。</p>
                    </div>
                  </div>
                </div>
            </div>
	    </div>
        <section id="middle">
        <div class="container">
            <div class="row">
            <div class="col-sm-6">
                <h3>后续计划</h3>
                <br>
                <div class="media"> <i class="fa fa-play-circle pull-left fa-3x"></i>
                <div class="media-body">
                    <h3 class="media-heading"> 计划增加移动端适配 </h3>
                    适配移动端，让移动端轻松访问</div>
                </div>
                <br>
                <div class="media"> <i class="fa fa-group pull-left fa-3x"></i>
                <div class="media-body">
                    <h3 class="media-heading"> 计划增加社区发帖功能 </h3>
                    可以发帖，可以回帖，加强联系，加强互动，不懂随时易解</div>
                </div>
                <br>
                <div class="media"> <i class="fa fa-comments pull-left fa-3x"></i>
                <div class="media-body">
                    <h3 class="media-heading"> 计划增加聊天功能 </h3>
                可以添加好友，联系好友，即时聊天，一起度过聊天组队开黑</div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="accordion">
                <h3>项目着重点</h3>
                <br>
                <div>
                    <ul class="progess-bars">
                        <li>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">设计 90%</div>
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">结构布置 85%</div>
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">拓展性 80%</div>
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">浏览器兼容性 85%</div>
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">屏幕适配 85%</div>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <footer id="footer">
            <div class="container">
                <div class="row">
                <div class="col-sm-6">Copyright © 2020 All Rights Reserved.</div>
                
                
                </div>
            </div>
        </footer>
    </div>

</template>

<script>
import Bus from '../../../build/bus.js'
export default {
    name:'about',
    data(){
        return{
             pathname:'about'
        }
    },
    created(){
      Bus.$emit("headerChange", this.pathname);
    }
}
</script>

<style >
@import '../../assets/css/aboutStyle.css';
@import 'bootstrap';
</style>