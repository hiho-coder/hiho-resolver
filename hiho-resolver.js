function Resolver(solutions, users, problem_count){
	this.solutions = solutions;
	this.users = users;
	this.problem_count = problem_count;
	this.frozen_seconds = 3600 * 2;
	this.operations = [];
}

Resolver.prototype.status = function(problem) {
	if(problem.old_verdict == 'NA' && problem.new_verdict == 'NA')
		return "untouched";
	else if(problem.old_verdict == 'AC')
		return "ac";
	else if(problem.new_verdict == 'NA')
		return "failed";
	else 
		return "frozen";
}

Resolver.prototype.calcOperations = function() {
	this.rank = {};
	for(var solution_id in this.solutions) {
		var sol = this.solutions[solution_id];
		if(['WT', 'CE', 'VE', 'SE'].indexOf(sol.verdict) != -1) {
			continue;
		}
		if(Object.keys(this.rank).indexOf(sol.user_id) == -1) {
			this.rank[sol.user_id] = {'score':0, 'penalty':0, 'user_id':sol.user_id};
			this.rank[sol.user_id].problem = {};
			for(var i = 1; i <= this.problem_count; i++) {
				this.rank[sol.user_id].problem[i] = {
					'old_penalty':0,
					'new_penalty':0,
					'old_verdict':'NA',
					'new_verdict':'NA',
					'old_submissions':0,	//include the AC submission
					'frozen_submissions': 0,
					'new_submissions':0,
					'ac_penalty':0
				};
			}
		}
		
		if(this.rank[sol.user_id].problem[sol.problem_index].old_verdict=='AC') {
			continue;
		}
		if(sol.submitted_seconds <= this.frozen_seconds) {
			this.rank[sol.user_id].problem[sol.problem_index].old_verdict = sol.verdict;
			if(sol.verdict == 'AC') {
				this.rank[sol.user_id].problem[sol.problem_index].old_submissions++;
				this.rank[sol.user_id].problem[sol.problem_index].ac_penalty = sol.submitted_seconds;
				this.rank[sol.user_id].problem[sol.problem_index].old_penalty = this.rank[sol.user_id].problem[sol.problem_index].ac_penalty + 20 * 60 * (this.rank[sol.user_id].problem[sol.problem_index].old_submissions - 1);
				this.rank[sol.user_id].score++;
				this.rank[sol.user_id].penalty += this.rank[sol.user_id].problem[sol.problem_index].old_penalty;
			}
			else {
				this.rank[sol.user_id].problem[sol.problem_index].old_submissions++;
			}
		}
		else {	//after standings get frozen	
			if(this.rank[sol.user_id].problem[sol.problem_index].new_verdict=='AC') {
				this.rank[sol.user_id].problem[sol.problem_index].frozen_submissions++;
				continue;
			}
			this.rank[sol.user_id].problem[sol.problem_index].new_verdict = sol.verdict;
			if(sol.verdict == 'AC') {
				this.rank[sol.user_id].problem[sol.problem_index].frozen_submissions++;
				this.rank[sol.user_id].problem[sol.problem_index].new_submissions = this.rank[sol.user_id].problem[sol.problem_index].old_submissions + this.rank[sol.user_id].problem[sol.problem_index].frozen_submissions;
				this.rank[sol.user_id].problem[sol.problem_index].ac_penalty = sol.submitted_seconds;
				this.rank[sol.user_id].problem[sol.problem_index].new_penalty = this.rank[sol.user_id].problem[sol.problem_index].ac_penalty + 20 * 60 * (this.rank[sol.user_id].problem[sol.problem_index].new_submissions - 1);
			}
			else {
				this.rank[sol.user_id].problem[sol.problem_index].frozen_submissions++;
			}
		}
	}
	
	var uids = Object.keys(this.rank);
	this.rank2 = [];
	for(var key in uids) {
		var user_id = uids[key];
		this.rank2.push(this.rank[user_id]);
	}
	this.rank2.sort(function(a, b){
		if(a.score == b.score) {
			return a.penalty - b.penalty;
		}
		return b.score - a.score;
	});
	//this.rank2.length = 200;
	this.rank_frozen = $.extend(true, [], this.rank2);
	for(var i = this.rank2.length - 1; i >= 0; i--) {
		var flag = true;
		while(flag) {
			flag = false;
			for(var j = 1; j <= this.problem_count; j++) {
				if(this.status(this.rank2[i].problem[j]) == "frozen") {
					flag = true;
					var op = {
						id: this.operations.length, 
						user_id: this.rank2[i].user_id,
						problem_index: j,
      					old_verdict: this.rank2[i].problem[j].old_verdict,
						new_verdict: this.rank2[i].problem[j].new_verdict,
						old_submissions: this.rank2[i].problem[j].old_submissions,
						frozen_submissions: this.rank2[i].problem[j].frozen_submissions,
						new_submissions: this.rank2[i].problem[j].new_submissions,
						old_rank: i,
						new_rank: -1,
						old_penalty: this.rank2[i].problem[j].old_penalty,
						new_penalty: this.rank2[i].problem[j].new_penalty
					};
					var tmp = this.rank2[i];
					if(tmp.problem[j].new_verdict == 'AC') {
						tmp.score++;
						tmp.penalty += tmp.problem[j].new_penalty;
					}
					tmp.problem[j].old_verdict = tmp.problem[j].new_verdict;
					tmp.problem[j].new_verdict = "NA";
					var k = i -1;
					while(k >= 0 && (this.rank2[k].score < tmp.score || this.rank2[k].score == tmp.score && this.rank2[k].penalty > tmp.penalty)) {
						this.rank2[k+1] = this.rank2[k];
						k--;
					}
					this.rank2[k+1] = tmp;
					op.new_rank = k+1;
					this.operations.push(op);
					break;
				}
			}
		}
	}
}