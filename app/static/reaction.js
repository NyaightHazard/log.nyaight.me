(function(){
    var target=document.querySelector("nav>ul>li>form>input[name=reaction][reaction-deck]");
    if(target!=null){
        var deck=target.getAttribute("reaction-deck").split(",");
        target.removeAttribute("reaction-deck");

        var deckHTML="<div class='reaction-deck'>";
        for(var i=0;i<deck.length;i++){
            deck[i]=deck[i].trim();
            if(deck[i]=="goose_honk.png"){ //special custom emoji
                deckHTML+=
                    "<span class='reaction-button'><img src='/static/emoji/"
                        +"goose_honk.png' alt=':goose_honk:' title=':goose_honk:' class='custom-emoji'></span> ";
            }else if(/^\w+\.\w+$/.test(deck[i])){
                var name=deck[i].match(/^\w+/)
                deckHTML+=
                    "<span class='reaction-button'><img src='/custom_emoji/"
                        +deck[i]+"' alt=':"+name+":' title=':"+name+":' class='custom-emoji'></span> ";
            }else{
                var code=[];
                for(var j=0;j<deck[i].length;j++){
                    code.push(deck[i].codePointAt(j).toString(16));
                    if(0xD7FF<deck[i].charCodeAt(j)&&deck[i].charCodeAt(j)<0xDC00)j++;
                }
                deckHTML+=
                "<span class='reaction-button'><img src='/static/twemoji/"
                    +code.join("-")+".svg' alt='"+deck[i]+"' class='emoji'></span> ";    
            }
        }
        deckHTML+="</div>";
    
        var nav=target.parentNode.parentNode.parentNode.parentNode;
        nav.insertAdjacentHTML("beforeend",deckHTML);

        var btn=nav.getElementsByClassName("reaction-button");
        for(var i=0;i<btn.length;i++){
            btn[i].addEventListener('click',function(e){
                target.value=e.target.getAttribute("alt");
            });
        }
    }
})();