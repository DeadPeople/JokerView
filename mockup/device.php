<?php
	if(!isset($_GET["time"])) {
		echo '{"series": [{';
		echo '"name": "Random data",';
		echo '"data": [';
		$a = explode(" ",microtime());
		$time = floor(($a[0]+$a[1])*1000);
		for ($i = -19; $i <= 0; $i++) {
			echo '{"x": '.($time+$i*1000).',';
			echo '"y": '.(rand(0,10000)/10000).'}';
			if($i != 0) echo ",";
		}
		echo ']';
		echo '}]}';
	} else {
		echo "{";
			echo '"x": '.$_GET["time"].',';
			echo '"y": '.(rand(0,10000)/10000);
		echo "}";
		
	}
?>