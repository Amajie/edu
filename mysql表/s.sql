/*
SQLyog Professional v12.09 (64 bit)
MySQL - 5.5.49 : Database - edu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`edu` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `edu`;

/*Table structure for table `articles` */

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `articleUserId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `articleId` varchar(255) NOT NULL COMMENT '唯一表示',
  `articleTime` bigint(255) DEFAULT NULL COMMENT '时间',
  `articleCommit` int(255) DEFAULT '0' COMMENT '评论',
  `articleReader` int(255) DEFAULT '0' COMMENT '阅读',
  `articleContent` longtext COMMENT '文章内容',
  `articleTitle` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `articleDraft` int(255) DEFAULT NULL COMMENT '是否为草稿',
  `collectList` varchar(255) DEFAULT '|' COMMENT '收藏列表',
  `likeList` varchar(255) DEFAULT '|' COMMENT '点赞列表',
  `opposeList` varchar(255) DEFAULT '|' COMMENT '举报列表',
  PRIMARY KEY (`articleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `articles` */

insert  into `articles`(`articleUserId`,`articleId`,`articleTime`,`articleCommit`,`articleReader`,`articleContent`,`articleTitle`,`articleDraft`,`collectList`,`likeList`,`opposeList`) values ('e29d50budfs0000000','927wgy6pxec000000',1590590239215,0,6,'<h1>思路</h1><h2 class=&a;ql-indent-1&a;><span style=&a;color: rgb(51, 51, 51);&a;>先传递一个对象，如果不传递则为window，然后为该对象添加一个属性fun，值为调用函数(foo)即为this，然后使用该对象调用该函数(foo)，this为调用的对象(context)，底层还是this的指向，然后处理参数传递问题。</span></h2><pre class=&a;ql-syntax&a; spellcheck=&a;false&a;>Function.prototype.mycall = function (context) {\n\n\n&nbsp; &nbsp; // 判断是否为函数\n&nbsp; &nbsp; if (typeof this !== &p;function&p;) {\n&nbsp; &nbsp; &nbsp; &nbsp; throw new TypeError(&p;not funciton&p;)\n&nbsp; &nbsp; }\n&nbsp; &nbsp;&nbsp;\n&nbsp; &nbsp; // 没有传递对象\n&nbsp; &nbsp; if(!context) return this()\n\n\n&nbsp; &nbsp; // 间接使用该对象调用该函数\n&nbsp; &nbsp; context.fun = this\n\n\n&nbsp; &nbsp; // 获取参数\n&nbsp; &nbsp; let arg = [...arguments].slice(1)\n&nbsp; &nbsp; // 调用函数 使用传递的对象调用\n&nbsp; &nbsp; let result = context.fun(...arg)\n&nbsp; &nbsp; // 删除该属性\n&nbsp; &nbsp; delete context.fun\n&nbsp; &nbsp; return result\n}\n\n\nfunction foo(){\n&nbsp; &nbsp; console.log(this.name)\n}\n\n\nfoo.mycall({name: &p;che&p;})\n</pre>','3432阿三打撒',1,'|','|','|'),('e29d50budfs0000000','fvp4dgts5ps0000000',1590583977965,1,6,'<p>嗯嗯呢，很好</p>','vue的相关知识点',1,'|e29d50budfs0000000|','|','|');

/*Table structure for table `commits` */

DROP TABLE IF EXISTS `commits`;

CREATE TABLE `commits` (
  `commitId` varchar(255) NOT NULL COMMENT '唯一表示',
  `commitUserId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `commitContent` varchar(10000) DEFAULT NULL COMMENT '评论内容',
  `commitTime` varchar(255) DEFAULT NULL COMMENT '评论时间',
  `commitArticleId` varchar(255) DEFAULT NULL COMMENT '文章id',
  PRIMARY KEY (`commitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `commits` */

insert  into `commits`(`commitId`,`commitUserId`,`commitContent`,`commitTime`,`commitArticleId`) values ('378a82tsqc80000000','e29d50budfs0000000','123213','2020-05-27','fvp4dgts5ps0000000');

/*Table structure for table `listcommits` */

DROP TABLE IF EXISTS `listcommits`;

CREATE TABLE `listcommits` (
  `commitId` varchar(255) NOT NULL COMMENT '唯一标识',
  `commitListId` varchar(255) DEFAULT NULL COMMENT '视频集id',
  `commitUserId` varchar(255) DEFAULT NULL COMMENT '评论用户id',
  `commitContent` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `commitTime` bigint(255) DEFAULT NULL COMMENT '评论时间',
  `commitVideo` int(255) DEFAULT NULL COMMENT '评论的第几个课时',
  `commitRate` int(255) DEFAULT NULL COMMENT '评分',
  PRIMARY KEY (`commitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `listcommits` */

insert  into `listcommits`(`commitId`,`commitListId`,`commitUserId`,`commitContent`,`commitTime`,`commitVideo`,`commitRate`) values ('3ujmg10rpd400000000','yl9e4fs9cgw0000000','e29d50budfs0000000','阿三大苏打♯',1590301936033,1,4),('7h9s50mimyg00000000','yl9e4fs9cgw0000000','e29d50budfs0000000','点点滴滴',1590303858134,1,4),('nzagzzl6ahc0000000','yl9e4fs9cgw0000000','e29d50budfs0000000','很好的',1590301916114,1,3),('t7yxt3yzeuo0000000','yl9e4fs9cgw0000000','e29d50budfs0000000','阿萨大是等',1590301930551,1,4),('vavpi9ldahc0000000','6a8i0bg2dmo00000000','e29d50budfs0000000','很好的课程',1590584384034,1,3),('w9qrh4tfqps0000000','yl9e4fs9cgw0000000','e29d50budfs0000000','12321321',1590303844566,1,5);

/*Table structure for table `lists` */

DROP TABLE IF EXISTS `lists`;

CREATE TABLE `lists` (
  `listId` varchar(255) NOT NULL COMMENT '唯一id',
  `listVideo` varchar(10000) DEFAULT '[' COMMENT '视频的id列表',
  `listUserId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `listTitle` varchar(255) DEFAULT NULL COMMENT '视频集标题',
  `listPoster` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `listGrade` int(255) DEFAULT '1' COMMENT '等级',
  `listTime` bigint(255) DEFAULT NULL COMMENT '时间戳',
  `listCommit` int(255) DEFAULT '0' COMMENT '评论数量',
  `listClick` int(255) DEFAULT '0' COMMENT '点击数量',
  `listRelease` int(255) DEFAULT '0' COMMENT '是否发布标志位',
  `listDesc` varchar(255) DEFAULT NULL COMMENT '视频集简介',
  `listType` varchar(255) DEFAULT NULL COMMENT '视频集分类',
  `listDirection` varchar(255) DEFAULT NULL COMMENT '视频集方向',
  `listCollect` varchar(255) DEFAULT '|' COMMENT '搜藏',
  PRIMARY KEY (`listId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `lists` */

insert  into `lists`(`listId`,`listVideo`,`listUserId`,`listTitle`,`listPoster`,`listGrade`,`listTime`,`listCommit`,`listClick`,`listRelease`,`listDesc`,`listType`,`listDirection`,`listCollect`) values ('6a8i0bg2dmo00000000','[3lwh5zxo93s0000000,','e29d50budfs0000000','node进阶视频','/api/poster/0IZM1-1XzjI2wFYWufr6i8D_.jpg',2,1590249966752,1,3,1,'很不错的node视频','服务器开发','node','|'),('7a1r9dgm0l00000000','[','e29d50budfs0000000','modb','/api//poster/iWeGs6qlsuhviqYPDBWz3mbN.jpg',2,1590323143993,0,0,0,NULL,'数据库开发','MongoDB','|'),('ui1ranluaps0000000','[515wufwxzx800000000,','e29d50budfs0000000','html5小白入门首选','/api/poster/rkiDaLz-e_b4S1-KjaFHrnK4.jpg',1,1590249940856,0,3,1,'大大大大大大','前端开发','HTML5','|'),('yl9e4fs9cgw0000000','[7zcfum3b1lc0000000,','e29d50budfs0000000','数据库高级课程','/api/poster/qYz2NdhwikQdUZmtPT7OzZVZ.png',3,1590249991817,6,12,1,'哈哈哈，数据库课程出来了','数据库开发','MySQL','|');

/*Table structure for table `replys` */

DROP TABLE IF EXISTS `replys`;

CREATE TABLE `replys` (
  `replyId` varchar(255) NOT NULL COMMENT '唯一表示',
  `replyUserId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `replyContent` varchar(10000) DEFAULT NULL COMMENT '回复内容',
  `replyCommitId` varchar(255) DEFAULT NULL COMMENT '关联楼主的评论id',
  `replyTime` varchar(255) DEFAULT NULL COMMENT '回复时间',
  `replyTargetId` varchar(255) DEFAULT NULL COMMENT '回复目标用户id',
  `replyArticleId` varchar(255) DEFAULT NULL COMMENT '文章id',
  PRIMARY KEY (`replyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `replys` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` varchar(255) NOT NULL COMMENT '唯一id',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名',
  `userCode` varchar(255) DEFAULT NULL COMMENT '密码',
  `userEmail` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `userSign` varchar(1000) DEFAULT NULL COMMENT '签名',
  `userGender` int(255) DEFAULT '1' COMMENT '性别',
  `userAddress` varchar(1000) DEFAULT NULL COMMENT '居住地址',
  `userFans` varchar(255) DEFAULT '|' COMMENT '粉丝',
  `userAvatar` varchar(255) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`userId`,`userName`,`userCode`,`userEmail`,`userSign`,`userGender`,`userAddress`,`userFans`,`userAvatar`) values ('e29d50budfs0000000','1111','96e79218965eb72c92a549dd5a330112',NULL,'我很厉害的',1,NULL,'|n3k8yoprucg0000000|rb2wtdgth6o0000000|','/api/avatar/i8sfHqk2-_B8TTqq58Z4SAMA.jpg'),('n3k8yoprucg0000000','3333','96e79218965eb72c92a549dd5a330112',NULL,NULL,1,NULL,'|','/api/avatar/init_avatar.png'),('rb2wtdgth6o0000000','2222','96e79218965eb72c92a549dd5a330112',NULL,NULL,1,NULL,'|','/api/avatar/init_avatar.png');

/*Table structure for table `videos` */

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `videoId` varchar(255) NOT NULL COMMENT '唯一id',
  `videoTitle` varchar(255) DEFAULT NULL COMMENT '视频标题',
  `videoDesc` varchar(1000) DEFAULT NULL COMMENT '视频描述',
  `videoUrl` varchar(255) DEFAULT NULL COMMENT '视频路径',
  `videoListId` varchar(255) DEFAULT NULL COMMENT '视频集id',
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `videos` */

insert  into `videos`(`videoId`,`videoTitle`,`videoDesc`,`videoUrl`,`videoListId`) values ('3lwh5zxo93s0000000','node进阶课程必看','包含node项目的搭建，路由的学习','1590250090329测试.mp4','6a8i0bg2dmo00000000'),('515wufwxzx800000000','html入门','很厉害的html课程，值得看一波','1590250007636hj.mp4','ui1ranluaps0000000'),('7zcfum3b1lc0000000','高级数据库mysql课程','厉害了，很不错的','1590250141220证明.mp4','yl9e4fs9cgw0000000');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
