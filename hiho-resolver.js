function Resolver(solutions, users, problem_count){
	this.solutions = solutions;
	this.users = users;
	this.problem_count = problem_count;
}

Resolver.prototype.calcOperations = function() {
	this.rank = {};
	for(var sol in this.solutions) {
		if(['WT', 'CE', 'VE', 'SE'].indexOf(sol.verdict) != -1) {
			continue;
		}
		
	}
}