<?
define("VERSION", rand(0,99999999));
?>

<!DOCTYPE html>
<!--
	Transit by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Parachute VR</title>
    <meta charset='utf-8'>
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
    <script src="js/jquery.min.js"></script>
    <script src="js/skel.min.js"></script>
    <script src="js/skel-layers.min.js"></script>
    <script src="js/init.js"></script>
    <noscript>
        <link rel="stylesheet" href="css/skel.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/style-xlarge.css" />
    </noscript>
    <style>
        .button{
            margin: 5px;
        }

        .alt{
            background: whitesmoke !important;
        }
    </style>
    <script src="js/leah.js"></script>
</head>
<body class="landing">

<!-- Header -->
<!--<header id="header">
    <h1><a href="index.php">Parachute VR</a></h1>
    <nav id="nav">
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="room.php?mode=time">Time Attack</a></li>
            <li><a href="room.php?mode=coins">Coin Collecting</a></li>
            <li><a href="#">Enable/Disable Stereo</a></li>

        </ul>
    </nav>
</header>-->


<!-- Banner -->
<section id="banner">
    <h2>Parachute VR</h2>
    <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>-->


    <ul class="actions">
        <!--					<li>
                                <a href="#" class="button big">Start</a>

                            </li>-->


        <li class="12u$(medium)"><a href="room.php?mode=time" class="button big icon fa-clock-o">Time Attack</a></li>


        <li class="12u$(medium)"><a href="room.php?mode=coins" class="button big icon fa-rocket">Coin Collecting</a></li>


        <li class="12u$(medium)"><a href="javascript: stereo()" id="stereo_btn" class="button big icon fa-male">Enable/Disable Stereo</a></li>


    </ul>
</section>

<!-- Three -->
<section id="three" class="wrapper style3 special">
    <!--<div class="container">
        <header class="major">
            <h2>Start Game</h2>
            <p>Lorem ipsum dolor sit amet. Delectus consequatur, similique quia!</p>
        </header>
    </div>-->
    <div class="container 50%">
        <form action="#" method="post">
            <div class="row uniform">
                <div class="6u 12u$(small)">
                    <input name="name" id="name" value="" placeholder="Nickname" type="text">
                </div>
                <div class="6u$ 12u$(small)">
                    <input name="server" id="server" value="panel.louislam.net:8324" placeholder="Server" type="text">
                </div>
                <!--<div class="12u$">
                    <textarea name="message" id="message" placeholder="Message" rows="6"></textarea>
                </div>-->
                <div class="12u$">
                    <ul class="actions">
                        <li><input value="Start" class="special big" type="submit"></li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</section>

<!-- One -->
<!--<section id="one" class="wrapper style1 special">
    <div class="container">
        <header class="major">
            <h2>Features</h2>

        </header>
        <div class="row 150%">
            <div class="4u 12u$(medium)">
                <section class="box">
                    <i class="icon big rounded color1 fa-cloud"></i>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quam consectetur quibusdam magni minus aut modi aliquid.</p>
                </section>
            </div>
            <div class="4u 12u$(medium)">
                <section class="box">
                    <i class="icon big rounded color9 fa-trophy"></i>
                    <h3>Consectetur adipisicing</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam consequatur repellat debitis maxime.</p>
                </section>
            </div>
            <div class="4u$ 12u$(medium)">
                <section class="box">
                    <i class="icon big rounded color6 fa-rocket"></i>
                    <h3>Adipisicing elit totam</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque eveniet, nesciunt molestias. Ipsam, voluptate vero.</p>
                </section>
            </div>
        </div>
    </div>
</section>-->

<!-- Two -->
<section id="two" class="wrapper style2 special">
    <div class="container">
        <header class="major">
            <h2>Our Team</h2>
            <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, autem.</p>-->
        </header>
        <section class="profiles">
            <div class="row">
                <section class="3u 6u(medium) 12u$(xsmall) profile">
                    <img src="images/profile_placeholder.gif" alt="" />
                    <h4>Director</h4>
                    <p>Louis Lam</p>
                </section>
                <section class="3u 6u$(medium) 12u$(xsmall) profile">
                    <img src="images/profile_placeholder.gif" alt="" />
                    <h4>Member</h4>
                    <p>Leah Wong</p>
                </section>
                <section class="3u 6u(medium) 12u$(xsmall) profile">
                    <img src="images/profile_placeholder.gif" alt="" />
                    <h4>Member</h4>
                    <p>William Wong</p>
                </section>
                <section class="3u$ 6u$(medium) 12u$(xsmall) profile">
                    <img src="images/profile_placeholder.gif" alt="" />
                    <h4>Member</h4>
                    <p>Billy Wong</p>
                </section>
            </div>
        </section>
        <!--<footer>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam dolore illum, temporibus veritatis eligendi, aliquam, dolor enim itaque veniam aut eaque sequi qui quia vitae pariatur repudiandae ab dignissimos ex!</p>
            <ul class="actions">
                <li>
                    <a href="#" class="button big">Lorem ipsum dolor sit</a>
                </li>
            </ul>
        </footer>-->
    </div>
</section>


<!-- Footer -->
<footer id="footer">
    <div class="container">
        <!--<section class="links">
            <div class="row">
                <section class="3u 6u(medium) 12u$(small)">
                    <h3>Lorem ipsum dolor</h3>
                    <ul class="unstyled">
                        <li><a href="#">Lorem ipsum dolor sit</a></li>
                        <li><a href="#">Nesciunt itaque, alias possimus</a></li>
                        <li><a href="#">Optio rerum beatae autem</a></li>
                        <li><a href="#">Nostrum nemo dolorum facilis</a></li>
                        <li><a href="#">Quo fugit dolor totam</a></li>
                    </ul>
                </section>
                <section class="3u 6u$(medium) 12u$(small)">
                    <h3>Culpa quia, nesciunt</h3>
                    <ul class="unstyled">
                        <li><a href="#">Lorem ipsum dolor sit</a></li>
                        <li><a href="#">Reiciendis dicta laboriosam enim</a></li>
                        <li><a href="#">Corporis, non aut rerum</a></li>
                        <li><a href="#">Laboriosam nulla voluptas, harum</a></li>
                        <li><a href="#">Facere eligendi, inventore dolor</a></li>
                    </ul>
                </section>
                <section class="3u 6u(medium) 12u$(small)">
                    <h3>Neque, dolore, facere</h3>
                    <ul class="unstyled">
                        <li><a href="#">Lorem ipsum dolor sit</a></li>
                        <li><a href="#">Distinctio, inventore quidem nesciunt</a></li>
                        <li><a href="#">Explicabo inventore itaque autem</a></li>
                        <li><a href="#">Aperiam harum, sint quibusdam</a></li>
                        <li><a href="#">Labore excepturi assumenda</a></li>
                    </ul>
                </section>
                <section class="3u$ 6u$(medium) 12u$(small)">
                    <h3>Illum, tempori, saepe</h3>
                    <ul class="unstyled">
                        <li><a href="#">Lorem ipsum dolor sit</a></li>
                        <li><a href="#">Recusandae, culpa necessita nam</a></li>
                        <li><a href="#">Cupiditate, debitis adipisci blandi</a></li>
                        <li><a href="#">Tempore nam, enim quia</a></li>
                        <li><a href="#">Explicabo molestiae dolor labore</a></li>
                    </ul>
                </section>
            </div>
        </section>-->
        <div class="row">
            <div class="8u 12u$(medium)">
                <ul class="copyright">
                    <li>CUHK CSE CSCI4140 Project</li>
                    <!--<li>Design: <a href="http://templated.co">TEMPLATED</a></li>
                    <li>Images: <a href="http://unsplash.com">Unsplash</a></li>-->
                </ul>
            </div>
            <!--<div class="4u$ 12u$(medium)">
                <ul class="icons">
                    <li>
                        <a class="icon rounded fa-facebook"><span class="label">Facebook</span></a>
                    </li>
                    <li>
                        <a class="icon rounded fa-twitter"><span class="label">Twitter</span></a>
                    </li>
                    <li>
                        <a class="icon rounded fa-google-plus"><span class="label">Google+</span></a>
                    </li>
                    <li>
                        <a class="icon rounded fa-linkedin"><span class="label">LinkedIn</span></a>
                    </li>
                </ul>
            </div>-->
        </div>
    </div>
</footer>
<script>
    var VERSION = <?=VERSION ?>;
</script>

<script src="js/jquery-2.1.3.min.js"></script>
</body>
</html>
