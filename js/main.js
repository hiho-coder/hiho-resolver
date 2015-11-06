/**
 *  main.js
 */


// localStorage
(function(exports){
    
    'use strict';

    var RANKS_KEY = 'icpc-ranks';
    var OPER_STACK_KEY = 'operation-stack';

    exports.Storage = {
        fetch: function(type) {
            if(type == 'ranks')
                return JSON.parse(localStorage.getItem(RANKS_KEY)) || RanksData.init();
            else if(type == 'operation')
                return JSON.parse(localStorage.getItem(OPER_STACK_KEY) || '[]');
        },

        update: function(type, data) {
            if(type == 'ranks')
                localStorage.setItem(RANKS_KEY, JSON.stringify(data));
            else if(type == 'operation')
                localStorage.setItem(OPER_STACK_KEY, JSON.stringify(data));
        }
    };

})(window);


// Vuejs
(function(exports){
    
    'use strict';

    exports.app = new Vue({
        
        el: '.app',

        data: {
            ranks: Storage.fetch('ranks'),
            operation: Storage.fetch('operation'),
            no_animate_running: true,
            p_names: {1:'A', 2:'B'}
        },

        ready: function () {
            this.$watch('ranks', function(ranks){
                Storage.update('ranks', ranks);
            }, {'deep': true});

            this.$watch('operation', function(operation){
                Storage.update('operation', operation);
            }, {'deep': true});
        },

        methods: {
            publish: function(rank_item, problem) {
                if(no_animate_running){

                }
            },

            changeRank: function(rank_item, problem){
                this.operationPush(rank_item);
                var old_rank = rank_item.rank;
                var new_rank = 3;
                
                var el_old_rank = $('#rank-'+old_rank);
                var el_new_rank = $('#rank-'+new_rank);
                var new_top = el_new_rank.position().top;
                var old_top = el_old_rank.position().top;
                var distance = new_top - old_top - 87;
                
                var ranks = this.ranks;
                var temp = $.extend(true, {}, rank_item);
                //animate
                el_old_rank.css('position', 'relative');
                el_new_rank.css('margin-top', '87px');
                el_old_rank.animate({
                    "top": distance+'px',
                }, 3000, function(){
                    el_new_rank.css('margin-top', '0');
                    el_old_rank.css('position', 'static');
                    rank_item.rank = new_rank;
                    // ranks.splice(2, 0, temp);
                    // ranks.$remove(rank_item);
                });
                

            },

            reset: function(){
                if(confirm('确定要重置排名吗？')){    
                    localStorage.clear();
                    window.location.reload();
                }
            },
            
            operationPush: function(rank_item){
                this.operation.push($.extend(true, {}, rank_item));
            },

            operationPop: function() {
                var op = this.operation;
                var ranks = this.ranks;
                for(var x in ranks){
                    if(ranks[x].name == _.last(op).name){
                        this.$set('ranks['+x+']', _.last(op));
                        break;
                    }
                }
                op.$remove(_.last(op));
            },

            computingRank: function(){
               
            }
        }
    });

})(window);



