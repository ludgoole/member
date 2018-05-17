<template>
	<div id="consult">
		<Row>
			<i-col class="listLeft">
				<h3 class="zx-title">监利县力推水稻生产全程机械化</h3>
				<div class="zx-time clear">
					<span>2015-02-05</span>
					<span>来源：网络</span>
					<span>浏览次数：53</span>
					<span class="zx-right">编辑：张超</span>
				</div>
				<p class="zx-content">
					近日，湖北省首家田间“农机4S店”在监利县红阳村福天下育秧工厂建成。这家 “农机4S店”投资200多万元，集农机展示与维修、农民培训于一体，从育秧到收割所 有环节的机械应有尽有。负责人谢申华介绍，该店展出世界领先水平的农机上百台套， 其中与水稻种植全程机械化有关的就有80多台套。除“农机4S店”，监利县还组建了飞 机植保防治队。负责人黎少清介绍，植保飞机由遥控指挥，最低飞行高度离农作物只有 4米，每天作业面积500多亩。今年“飞保队”拟购飞机20架，成为全省第一支、全国第 二支飞机植保防治队。监利县农机局局长陈义书说，农机化的快速发展为实现 水稻生产全程机械化提供了保障。
				</p>
				<p class="zx-content">
					近日，湖北省首家田间“农机4S店”在监利县红阳村福天下育秧工厂建成。这家 “农机4S店”投资200多万元，集农机展示与维修、农民培训于一体，从育秧到收割所 有环节的机械.
				</p>
				<div @click="modal1 = true">
					<div class="jubao">
						举报
					</div>
					<div class="zanBtn">
						<Button shape="circle"><span class="zanIcon"></span><span>赞</span><span>|</span><span> 3241</span></Button>

					</div>
				</div>
				<h3 class="xgzx">
              上一篇：新型水稻插秧机解决丘陵种植难
            </h3>
				<h3 class="xgzx">下一篇：新型水稻插秧机解决丘陵种植难</h3>
				<div class="marginTop">
					<Row>
						<i-col span="2">
							<img src="../../img/user-icon.png" />
						</i-col>
						<i-col span="21" class="loginTip">
							<div>
								<Button type="success" class="btnReset">登录</Button>后发表评论
							</div>
						</i-col>
					</Row>
				</div>
				<div class="CommentTab">
					<span class="CommentBars"><span>245</span>评论</span>
					<Tabs value="name1">
						<Tab-pane label="最新评论" name="name1">
							<ul class="userComment-list">
								<li>
									<div class="userComment clear">
										<img src="../../img/user-icon2.png">
										<div class="userComment-infor">
											<span>李大发</span>
											<p>2017.05.22 19:38</p>
										</div>
									</div>
									<p class="userComment-content">解决了我们的大难题</p>
									<div class="comment">
										<span><img src="../../img/zan-icon1.png"/>赞106</span>
										<span @click="reply"><img src="../../img/huifu-icon.png"/>回复</span>
									</div>
									<ul class="replyContent" v-show="replyContent">
										<li>
											<p><span class="replyName">张晓晨:</span>下情况，可我是来看分析和干货的啊，蹭热度够够的，果然不应该打开首页 文章手贱。
											</p>
											<div class="replyTime clear">
												<span>2017.05.22 19:38</span>
												<div>
													<span><img src="../../img/zan-icon1.png"/>赞106</span>
													<span><img src="../../img/huifu-icon.png"/>回复</span>
												</div>

											</div>
										</li>
									</ul>
								</li>
								<li>
									<div class="userComment clear">
										<img src="../../img/user-icon2.png">
										<div class="userComment-infor">
											<span>李大发</span>
											<p>2017.05.22 19:38</p>
										</div>
									</div>
									<p class="userComment-content">解决了我们的大难题</p>
									<div class="comment">
										<span><img src="../../img/zan-icon1.png"/>赞106</span>
										<span><img src="../../img/huifu-icon.png"/>回复</span>
									</div>
								</li>
								<li>
									<div class="userComment clear">
										<img src="../../img/user-icon2.png">
										<div class="userComment-infor">
											<span>李大发</span>
											<p>2017.05.22 19:38</p>
										</div>
									</div>
									<p class="userComment-content">解决了我们的大难题</p>
									<div class="comment">
										<span><img src="../../img/zan-icon1.png"/>赞106</span>
										<span><img src="../../img/huifu-icon.png"/>回复</span>
									</div>
								</li>
							</ul>
						</Tab-pane>
						<Tab-pane label="我的评论" name="name2">标签二的内容</Tab-pane>
					</Tabs>
				</div>
			</i-col>
			<i-col class="xg-content">
				<div>
					<h3>相关应用</h3>
					<ul class="search-xgyy clear">
						<li>
							<img src="../../img/xgyy-icon1.png" />
							<div>物种百科</div>
						</li>
						<li>
							<img src="../../img/xgyy-icon2.png" />
							<div>物种资讯</div>
						</li>
					</ul>
				</div>
				<div>
					<h3>相关专家</h3>
					<ul class="search-xgyy clear">
						<li>
							<img  src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E7%99%BD%E6%A1%82%E8%90%8D.jpg"/>
							<div>白桂萍</div>
						</li>
						<li>
							<img  src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E4%BB%98%E6%B8%85%E8%8F%8A.jpg"/>
							<div>付清菊</div>
						</li>
						<li>
							<img  src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E6%A2%81%E6%B8%85%E5%BF%97.jpg"/>
							<div>梁清志</div>
						</li>
						<li>
							<img  src="http://www.ns51.cn/upload/userimg/experts/hbaas/%E6%9D%A8%E8%87%AA%E6%96%87.jpg"/>
							<div>杨自文</div>
						</li>
					</ul>
				</div>
				<div>
					<h3>相关企业</h3>
					<ul class="search-xgyy clear">
						<li>
							<img src="../../img/xgqy-icon1.png" />
							<div>58同城</div>
						</li>
						<li>
							<img src="../../img/xgqy-icon2.png" />
							<div>智联招聘</div>
						</li>
					</ul>
				</div>
				<div>
					<h3>相关搜索</h3>
					<ul class="search-xgyy clear">
						<li>
							<img src="../../img/xgss-icon1.png" />
							<div>水稻收割机</div>
						</li>
					</ul>
				</div>
			</i-col>
		</Row>
	</div>
</template>