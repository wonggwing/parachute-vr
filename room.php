<?
define("VERSION", rand(0,99999999));
?>
<?php include('header.php'); ?>

    <style>
        body {
            margin: 0;
            /*overflow: hidden;*/
        }

        #example {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        #state {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            margin: 30px;
        }

        #state h4{

            color: orange !important;
        }

        .horizon_ul{
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .horizon_ul li{
            display: inline;
        }

        div.center{
            margin-left: auto;
            margin-right: auto;
        }

        .speedometer{
            visibility: hidden;
        }
    </style>

    <div id="room">
        <section>
            <br/><br/><br/><br/><br/>
            <div class="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Ready?</th>
                    </tr>
                    </thead>
                    <tfoot>

                    </tfoot>
                    <tbody id="player-list">

                    </tbody>
                </table>
            </div>
            <br/>
        </section>
        <section>
            <div class="row">

                <ul class="horizon_ul">
                    <li class="4u$ 12u$(small)"><a class="button icon fa-plane" href="javascript:room.toggleReady();">Ready</a></li>
                    <li class="4u$ 12u$(small)"><a class="button icon fa-child" href="javascript:room.send({'start' : ''})">Start</a></li>

                </ul>
            </div>
        </section>
        <section>
            <div id="state">
                <?php if ( $_GET["mode"] == "coins" ) { ?>
                    <h4><i class="icon small rounded color1 fa-cloud">&nbsp;</i> Height: <span id="height">30000</span>m</h4>
                    <h4><i class="icon small rounded color9 fa-money">&nbsp;</i> Coins: <span id="coin">0</span></h4>
                <?php } else { ?>
                    <h4><i class="icon small rounded color1 fa-cloud">&nbsp;</i> Height: <span id="height">10000</span>m</h4>
                    <h4><i class="icon small rounded color6 fa-ambulance" style="">&nbsp;</i> First to land suceessfully wins!</h4>
                    <h4 class="speedometer"><i class="icon small rounded color8 fa-rocket" style="">&nbsp;</i> Speed: <span id="speed">0</span>km/h</h4>
                <?php } ?>
            </div> 
        </section>
    </div>

    <div id="example" style="display:none"></div>

    <script>
        var VERSION = <?=VERSION ?>;
    </script>
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/room.js?v=<?=VERSION ?>"></script>

    <script src="js/third-party/threejs/three.min.js"></script>
    <script src="js/third-party/threejs/OBJLoader.js"></script>
    <script src="js/third-party/threejs/StereoEffect.js"></script>
    <script src="js/third-party/threejs/DeviceOrientationControls.js"></script>
    <script src="js/third-party/threejs/OrbitControls.js"></script>
    <script src="js/third-party/threejs/threex.keyboardstate.js"></script>
    <?php if ( $_GET["mode"] == "coins" ) { ?>
        <script src="js/main.js?v=<?=VERSION ?>"></script>
    <?php } else { ?>
        <script src="js/mainTimeAttack.js?v=<?=VERSION ?>"></script>
    <?php } ?>

<?php include('footer.php'); ?>
