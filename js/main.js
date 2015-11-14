/**
 *  main.js
 */

(function(exports){
    
    'use strict';

    var RANKS_KEY = 'icpc-ranks';
    var OPER_FLAG_KEY = 'operation-flag';

    exports.Storage = {
        fetch: function(type) {
            if(type == 'ranks')
                return JSON.parse(localStorage.getItem(RANKS_KEY)) || exports.resolver.rank_frozen;
            else if(type == 'opera_flag')
                return localStorage.getItem(OPER_FLAG_KEY) || 0;
        },

        update: function(type, data) {
            if(type == 'ranks')
                localStorage.setItem(RANKS_KEY, JSON.stringify(data));
            else if(type == 'opera_flag')
                localStorage.setItem(OPER_FLAG_KEY, data);
        }
    };

    exports.Operation = {
        next: function() {
            vm.$data.op_status = false;
            var op = vm.$data.operations[vm.$data.op_flag];
            var op_length = vm.$data.operations.length - 1;
            if(vm.$data.op_flag < op_length)
                var op_next = vm.$data.operations[vm.$data.op_flag+1];
            var ranks = vm.$data.ranks;
            var rank_old = ranks[op.old_rank];

            var el_old = $('#rank-' + op.old_rank);
            var el_new = $('#rank-' + op.new_rank);

            el_old
                .find('.p-'+op.problem_index).addClass('uncover')
                .find('.p-content').addClass('uncover');
            if(op.new_rank == op.old_rank){
                if(vm.$data.op_flag < op_length)
                    var el_old_next = $('#rank-' + op_next.old_rank);
                setTimeout(function(){ 
                    if(op.new_verdict == 'AC'){
                        rank_old.score += 1;
                        rank_old.penalty += op.new_penalty;
                    }
                    rank_old.problem[op.problem_index].old_verdict = op.new_verdict;
                    rank_old.problem[op.problem_index].new_verdict = "NA";
                    Vue.nextTick(function(){
                        el_old
                            .find('.p-'+op.problem_index).addClass('uncover')
                            .find('.p-content').removeClass('uncover');
                    });
                        
                    setTimeout(function(){
                        vm.selected(el_old, 'remove');
                        if(vm.$data.op_flag < op_length)
                            vm.selected(el_old_next, 'add');
                        el_old.find('.p-'+op.problem_index).removeClass('uncover');
                        // vm.scrollToTop(op.old_rank, op_next.old_rank);
                        vm.$data.op_flag += 1;
                        vm.$data.op_status = true;
                    }, 600);
                }, 500);
            }else{
                var old_pos_top = el_old.position().top;
                var new_pos_top = el_new.position().top;
                var distance = new_pos_top - old_pos_top;
                var win_heigth = $(window).height();
                if(Math.abs(distance) > win_heigth){
                    distance = -(win_heigth);
                }
                var j = op.old_rank - 1;
                var el_obj = [];
                for(j; j >= op.new_rank; j--){
                    var el = $('#rank-'+ j);
                    el_obj.push(el);
                }
                setTimeout(function(){
                    // return function(){
                        // 修改原始数据
                        if(op.new_verdict == 'AC'){
                            rank_old.score += 1;
                            rank_old.penalty += op.new_penalty;
                        }
                        rank_old.problem[op.problem_index].old_verdict = op.new_verdict;
                        rank_old.problem[op.problem_index].new_verdict = "NA";
                        //
                        Vue.nextTick(function(){
                            //添加揭晓题目闪动效果
                            el_old
                                .find('.p-'+op.problem_index).addClass('uncover')
                                .find('.p-content').removeClass('uncover');
                            //修改排名
                            el_old.find('.rank').text(op.new_rank+1);
                            el_obj.forEach(function(val,i){ 
                                var dom_rank = el_obj[i].find('.rank');
                                dom_rank.text(Number(dom_rank.text())+1);
                            });
                        });

                    setTimeout(function(){ 
                        el_old
                            .css('position', 'relative')
                            .animate({ top: distance+'px' }, 1500, function(){
                                el_new.removeAttr('style');
                                el_old.removeAttr('style');
                                var ranks_tmp = $.extend(true, [], ranks);
                                var data_old = ranks_tmp[op.old_rank];
                                var i = op.old_rank - 1;
                                for(i; i >= op.new_rank; i--){
                                    ranks_tmp[i+1] = ranks_tmp[i];
                                }
                                ranks_tmp[op.new_rank] = data_old;
                                vm.$set('ranks', ranks_tmp);
                                Vue.nextTick(function () {
                                    el_obj.forEach(function(val,i){ el_obj[i].removeAttr('style'); });
                                    el_old.find('.p-'+op.problem_index).removeClass('uncover');
                                    if(vm.$data.op_flag < op_length)
                                        var el_old_next = $('#rank-' + op_next.old_rank);
                                    vm.selected(el_old, 'remove');
                                    if(vm.$data.op_flag < op_length)
                                        vm.selected(el_old_next, 'add');
                                    // vm.scrollToTop(op.old_rank, op.new_rank);
                                    vm.$data.op_flag += 1;
                                    vm.$data.op_status = true;
                                });
                            });

                        el_obj.forEach(function(val,i){ el_obj[i].animate({'top': 106+'px',},1500); });
                    }, 600);// two loop    
                    // };
                }, 500);
            }
        },

        back: function() {

        }
    };

})(window);

// Vuejs
function vuejs() {
    Vue.filter('toMinutes', function (value) {
        return parseInt(value/60);
    });

    Vue.filter('problemStatus', function (problem) {
        return resolver.status(problem);
    });
    
    Vue.filter('submissions', function (value) {
        var st = resolver.status(value);
        if(st == 'ac')
            return value.submissions + 1;
        // todo
    });

    Vue.config.debug = true;

    window.vm = new Vue({
        el: '.app',

        data: {
            op_flag: Number(Storage.fetch('opera_flag')),
            op_status: true,  // running: false, stop: true
            p_count: resolver.problem_count,
            ranks: Storage.fetch('ranks'),
            operations: resolver.operations,
            users: resolver.users
        },

        ready: function () {
            this.$watch('ranks', function(ranks){
                Storage.update('ranks', ranks);
            }, {'deep': true});

            this.$watch('op_flag', function(op_flag){
                Storage.update('opera_flag', op_flag);
            }, {'deep': true});

            var op = this.operations[this.op_flag];
            this.selected($('#rank-'+op.old_rank), 'add');
        },

        methods: {
            reset: function(){
                if(confirm('确定要重置排名吗？')){    
                    localStorage.clear();
                    window.location.reload();
                }
            },

            selected: function(el, type){
                if(type == 'add'){
                    el.addClass('selected');
                    // var win_heigth = $(window).height();
                    // var el_pos = el.position().top;
                    // var offset = el_pos - win_heigth + 261;
                    // window.scrollTo(0, offset);
                }else if(type == 'remove')
                    el.removeClass('selected');
                
            },

            // scrollToTop: function(old_rank, new_rank){
            //     var next_scrollY = -(new_rank * 75 + 52); // 75px: rank-item height; 52px: header
            //     scrollInterval = setInterval(function(){
            //         if (window.scrollY != next_scrollY) {
            //             window.scrollBy(0, -1);
            //         }
            //         else clearInterval(scrollInterval); 
            //     },30);

            // }

        }
    });
}

$.getJSON("contest.json", function(data){
    var resolver = new Resolver(data.solutions, data.users, data.problem_count);
    window.resolver = resolver;
    resolver.calcOperations();
    vuejs();

    // var el = $("#rank-0").position().top;
    // alert(el);
    // alert(window.scrollY);
    // alert($(document).height());
    // alert(document.body.clientHeight);

    document.onkeydown = function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode == 37 && vm.$data.op_status){ // key left
            Operation.back();
        }
        if(e && e.keyCode == 39 && vm.$data.op_status){ // key right
            Operation.next();
        }
    };
});
