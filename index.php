<?php
header("Content-Type:text/html;charset=utf-8");
$mysql = new mysqli('localhost', 'root', '', 'cake');
$mysql->set_charset('utf8');
//获取表
$cakeRes = $mysql->query("select * from cake where dataItem = 'cake'");
$IceCreamRes = $mysql->query("select * from cake where dataItem = 'IceCream'");
$AfternoonTRes = $mysql->query("select * from cake where dataItem = 'AfternoonT'");
$breadRes = $mysql->query("select * from cake where dataItem = 'bread'");
$NormalTempRes = $mysql->query("select * from cake where dataItem = 'NormalTemp'");
$giftRes = $mysql->query("select * from cake where dataItem = 'gift'");
$newRes = $mysql->query("select * from cake where dataItem = 'new'");
$PopularityRes = $mysql->query("select * from cake where dataItem = 'Popularity'");
$BirthdayRes = $mysql->query("select * from cake where dataItem = 'Birthday'");

while ($r1 = $cakeRes->fetch_assoc()) {
  $cakeDate[] = $r1;
}
while ($r2 = $IceCreamRes->fetch_assoc()) {
  $IceCreamDate[] = $r2;
}
while ($r3 = $AfternoonTRes->fetch_assoc()) {
  $AfternoonTDate[] = $r3;
}
while ($r4 = $breadRes->fetch_assoc()) {
  $breadDate[] = $r4;
}
while ($r5 = $NormalTempRes->fetch_assoc()) {
  $NormalTempDate[] = $r5;
}
while ($r6 = $giftRes->fetch_assoc()) {
  $giftDate[] = $r6;
}
while ($r7 = $newRes->fetch_assoc()) {
  $newData[] = $r7;
}
while ($r8 = $PopularityRes->fetch_assoc()) {
  $PopularityData[] = $r8;
}
while ($r9 = $BirthdayRes->fetch_assoc()) {
  $BirthdayData[] = $r9;
}

$count = count($cakeDate) + count($IceCreamDate) + count($AfternoonTDate) + count($breadDate) + count($NormalTempDate)
  + count($giftDate) + count($newData) + count($PopularityData) + count($BirthdayData);

//获取lable副表
$lableDateAdd = [];
for ($i = 1; $i < $count + 1; $i++) {
  $cakelableRes = $mysql->query("select lable from cakelable where id = $i");
  $lableDate = [];
  while ($r10 = $cakelableRes->fetch_assoc()) {
    array_push($lableDate, $r10);
  }
  array_push($lableDateAdd, $lableDate);
}
//获取lunbo副表
$lunboDateAdd = [];
for ($i = 1; $i < $count + 1; $i++) {
  $cakelunboRes = $mysql->query("select lunboImg from cakelunbo where id = $i");
  $lunboDate = [];
  while ($r11 = $cakelunboRes->fetch_assoc()) {
    array_push($lunboDate, $r11);
  }
  array_push($lunboDateAdd, $lunboDate);
}
//获取show副表
$showDateAdd = [];
for ($i = 1; $i < $count + 1; $i++) {
  $cakeshowRes = $mysql->query("select showImg from cakeshow where id = $i");
  $showDate = [];
  while ($r12 = $cakeshowRes->fetch_assoc()) {
    array_push($showDate, $r12);
  }
  array_push($showDateAdd, $showDate);
}
//所有得到的数据放在一个数组
$addArr = array(
  "resultCode" => 200,
  "message" => "查询成功！",
  "cake" => $cakeDate,
  "IceCream" => $IceCreamDate,
  "AfternoonT" => $AfternoonTDate,
  "bread" => $breadDate,
  "NormalTemp" => $NormalTempDate,
  "gift" => $giftDate,
  "new" => $newData,
  "Popularity" => $PopularityData,
  "Birthday" => $BirthdayData,
  'Lable' => $lableDateAdd,
  "Iunbo" => $lunboDateAdd,
  "Show" => $showDateAdd
);
//将得到的数组以json格式返回给前端
$json = json_encode($addArr, JSON_UNESCAPED_UNICODE);
echo ($json);
//释放结果集
$cakeRes->free();
$IceCreamRes->free();
$AfternoonTRes->free();
$breadRes->free();
$NormalTempRes->free();
$giftRes->free();
$newRes->free();
$PopularityRes->free();
$BirthdayRes->free();
$cakelableRes->free();
$cakelunboRes->free();
$cakeshowRes->free();
//关闭数据库
$mysql->close();
