/*
 *  Ranks data
 */


// 初始排名数据
(function(exports){

    'use strict';

    var RANKS = [
            {
                'rank': 1,
                'college': 'pku',
                'name': '北京大学',
                'penalty': 456,
                'solved': 5,
                'problems': [
                    {
                        'index': '1',
                        'name': 'A+B',
                        'status': 'unknow', // 'solved', 'no-try', 'wrong', 'unknow'
                        'score': 5
                    },
                    {
                        'index': '2',
                        'name': 'A+B+C',
                        'status': 'no-try', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    }
                ]
            },
            {
                'rank': 2,
                'name': '清华大学',
                'score': 300,
                'penalty': '12:40:59',
                'solved': 5,
                'problems': [
                    {
                        'index': '题目一',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目二',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    }
                ]
            },
            {
                'rank': 3,
                'name': '北京航空航天大学',
                'score': 300,
                'penalty': '12:40:59',
                'solved': 5,
                'problems': [
                    {
                        'index': '题目一',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目二',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow',
                        'score': 5
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    }
                ]
            },
            {
                'rank': 4,
                'name': '上海交通大学',
                'score': 300,
                'penalty': '12:40:59',
                'solved': 5,
                'problems': [
                    {
                        'index': '题目一',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目二',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    }
                ]
            },
            {
                'rank': 5,
                'name': '杭州电子科技大学',
                'score': 300,
                'penalty': '12:40:59',
                'solved': 5,
                'problems': [
                    {
                        'index': '题目一',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目二',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow',
                        'score': 5
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow',
                        'score': 5
                    }
                ]
            },
            {
                'rank': 6,
                'name': '华南理工大学（计算机学院）',
                'score': 300,
                'penalty': '12:40:59',
                'solved': 5,
                'problems': [
                    {
                        'index': '题目一',
                        'name': 'A+B',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目二',
                        'name': 'A+B+C',
                        'status': 'unknow', 
                        'score': 5
                    },
                    {
                        'index': '题目三',
                        'name': 'A+B',
                        'status': 'unknow',
                        'score': 5
                    },
                    {
                        'index': '题目四',
                        'name': 'A+B+C',
                        'status': 'unknow',
                        'score': 5
                        
                    },
                    {
                        'index': '题目五',
                        'name': 'A+B+C',
                        'status': 'unknow',
                        'score': 5
                    }
                ]
            }
        ];

    exports.RanksData = {
        init: function(){
            return RANKS;
        }
    };

})(window);
