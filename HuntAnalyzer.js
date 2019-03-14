registerPlugin({
    name: 'Hunt Analyzer',
    version: '1.0',
    description: 'Hunt Division for tibia, works for x2,x3 and x4 Party members',
    author: 'D.Zerto',
    vars: []
}, function(sinusbot, config) {
    // your code goes here
    var Gasto = [
        0,
        0,
        0,
        0
    ];
    var Vocs = [
        "EK: ",
        "ED: ",
        "MS: ",
        "RP: "
    ];
    var GastoTotal;
    var MenbrosParty;
    var Loot=0;
    var Lucro=0;

    sinusbot.on('chat', function(ev) {

        var tryIt = verifyText(ev.msg);

        switch(tryIt) {
            case 1: // Gasto EK
                Gasto[0] = parseInt(ev.msg.substring(3));
                sinusbot.chatChannel("Gasto do Ek setadkao para " + Gasto[0] + "k");
                return;
            case 2:// Gasto ED
                Gasto[1] = parseInt(ev.msg.substring(3));
                sinusbot.chatChannel("Gasto do ED setado para " + Gasto[1] + "k");
                return;
            case 3:// Gasto MS
                Gasto[2] = parseInt(ev.msg.substring(3));
                sinusbot.chatChannel("Gasto do MS setado para " + Gasto[2] + "k");
                return;
            case 4:// Gasto RP
                Gasto[3] = parseInt(ev.msg.substring(3));
                sinusbot.chatChannel("Gasto do RP setado para " + Gasto[3] + "k");
                return;
            case 5:// Loot Total Dropado
                Loot = parseInt(ev.msg.substring(5));
                sinusbot.chatChannel("Loot da Hunt setado para " + Loot + "k");
                return;
            case 6:// Calculo da HUNT + profit
                MenbrosParty=0;
                GastoTotal=0;
                Lucro=0;

                sinusbot.chatChannel("");
                sinusbot.chatChannel('╔═══════════════════════════');
                sinusbot.chatChannel('║ Hunt Summary');
                sinusbot.chatChannel('╠═══════════════════════════');

                for(var i = 0; i < Gasto.length; i++){
                    if (Gasto[i]>0)
                        MenbrosParty+=1;
                    GastoTotal += Gasto[i]
                }
                Lucro = Loot-GastoTotal;
                Lucro = (Lucro/MenbrosParty)

                
                for(var i = 0; i < Gasto.length; i++){
                    if (Gasto[i]>0)
                    {
                        var e = Gasto[i]+Lucro;
                        sinusbot.chatChannel("║ "+ Vocs[i] + e +" ( "+ Gasto[i] + " + " + Lucro + ")");
                    }                    
                }
                    
                sinusbot.chatChannel('╠═══════════════════════════');
                sinusbot.chatChannel("║ Waste Total: " + GastoTotal);
                sinusbot.chatChannel("║ Lucro Individual: " + Lucro);
                sinusbot.chatChannel('╚═══════════════════════════');

                return;
            case 7: // Clear Wastes               
                for(var i = 0; i < Gasto.length; i++)
                    Gasto[i]=0;
                loot=0;
                sinusbot.chatChannel("Hunt resetada");
                return;
            default:
                return;
        }
    });

    function verifyText(str){
        if (str.match(/!ek/g)){
            return 1;
        }
        
        if (str.match(/!ed/g)){
            return 2;
        }
        
        if (str.match(/!ms/g)){
            return 3;
        }
        
        if (str.match(/!rp/g)){
            return 4;
        }
        
        if (str.match(/!loot/g)){
            return 5;
        }

        if (str.match(/!calc/g)){
            return 6;
        }

        if (str.match(/!clear/g)){
            return 7;
        }
        return 0;
    }
});