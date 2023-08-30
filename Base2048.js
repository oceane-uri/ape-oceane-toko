(function ($) // début du pluggin
    {
        $.fn.game2048 = function () //function game2048 du pluggin
        {
            // génération du tableau (table, tr, td) vide (rempli de zéros)
            function generate_map() {
                var table = $('<table></table>');
                for (var y = 0; y < 4; y++) {
                    var ligne = $('<tr></tr>');
                    for (var x = 0; x < 4; x++) {
                        var cases = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                        ligne.append(cases);
                    }
                    table.append(ligne);
                }
                return table;
            }

            // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
            function generate_case(cases) {
                for (var i = 0; i < cases; i++) {
                    var x = Math.floor((Math.random() * 4));
                    var y = Math.floor((Math.random() * 4));
                    var value = 2 * (Math.floor((Math.random() * 2) + 1));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                    if (value === 4 && Math.random() > 0.5)
                        value = 2;
                    if (!elem[0])
                        generate_case(1);
                    else {
                        elem.attr('nbr', value);
                        elem.text(value);
                    }
                }
            }

            // fonction de gestion des évenements (appuie de touches)
            $('html').keydown(function (event) {
                switch (event['key']) {
                    case 'ArrowLeft':
                        // insérer algo move left
                        console.log("Left");
                        break;
                    case 'ArrowUp':
                        // insérer algo move up
                        console.log("Up");
                        break;
                    case 'ArrowRight':
                        // insérer algo move right
                        console.log("Right");
                        break;
                    case 'ArrowDown':
                        // insérer algo move down
                        console.log("Down");
                        break;
                }
            });

            function init(option) {
                WIN = false;
                SCORE = 0;

                if (getCookie("cookie2048")) {
                    MAP = JSON.parse(getCookie("cookie2048"));
                    console.log(MAP);
                } else {
                    for (var j = 0; j < MAP_SIZE; j++) {
                        MAP[j] = new Array();
                        for (var i = 0; i < MAP_SIZE; i++) {
                            MAP[j][i] = 0;
                        }
                    }
                    addNewTile();
                    console.log(MAP);
                }
                display();
            }

            /*

            	MOVE YOUR MAP !

            */


            function move(direction, modified) {
                var is_move = false;

                var k = 0;
                while (k < MAP_SIZE) {
                    var i = 0;
                    while (i < MAP_SIZE) {
                        var j = 0;
                        while (j < MAP_SIZE) {
                            switch (direction) {
                                case "left":
                                    if ((MAP[k][j + 1] > 0) && (MAP[k][j] == 0)) {
                                        MAP[k][j] = MAP[k][j + 1];
                                        MAP[k][j + 1] = 0;
                                        is_move = true;
                                        modified = true;
                                    }
                                    break;
                                case "right":
                                    if ((MAP[k][j + 1] == 0) && (MAP[k][j] > 0)) {
                                        MAP[k][j + 1] = MAP[k][j];
                                        MAP[k][j] = 0;
                                        is_move = true;
                                        modified = true;
                                    }
                                    break;
                                case "top":
                                    if ((j < 3) && (MAP[j + 1][k] > 0) && (MAP[j][k] == 0)) {
                                        MAP[j][k] = MAP[j + 1][k];
                                        MAP[j + 1][k] = 0;
                                        is_move = true;
                                        modified = true;
                                    }
                                    break;
                                case "bottom":
                                    if ((j < 3) && (MAP[j][k] > 0) && (MAP[j + 1][k] == 0)) {
                                        MAP[j + 1][k] = MAP[j][k];
                                        MAP[j][k] = 0;
                                        is_move = true;
                                        modified = true;
                                    }
                                    break;
                            }
                            j++;
                        }
                        i++;
                    }
                    k++;
                }
                matchTest(direction, is_move, modified);
            }
            // début du code lancé
            $(this).append(generate_map()); // génération du tableau vide
            generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
        }

    })(jQuery); // fin du pluggin