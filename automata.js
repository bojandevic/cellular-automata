function Automata(w, l) {
	var self = this

	self.generateAutomata = function() {
		self.automata = [];

		self.automata[0] = []
		for (x = 0; x < w; x++)
			self.automata[0][x] = self.random()

		for (y = 1; y < l; y++) {
			self.automata[y] = []
			for (x = 0; x < w; x++)  {
				var left = self.getLeft(),
					 center = self.getCenter(),
					 right = self.getRight()

				self.automata[y][x] = self.rule(left, center, right)
			}
		}
	}

	self.random = function() {
		return Math.random() < 0.5;
	}

	self.getCenter = function() {
		return self.automata[y-1][x]
	}

	self.getLeft = function() {
		var left
		if (x == 0)
			left = self.automata[y-1][w-1]
		else
			left = self.automata[y-1][x-1]

		return left
	}

	self.getRight = function() {
		var right
		if (x == w-1)
			left = self.automata[y-1][0]
		else
			left = self.automata[y-1][x+1]
	}

	self.rule = function(left, center, right) {
		if (left && center && right)
			return false
		else if (left && center && !right)
			return false
		else if (left && !center && right)
			return false
		else if (left && !center && !right)
			return true
		else if (!left && center && right)
			return true
		else if (!left && center && !right)
			return true
		else if (!left && !center && right)
			return true
		else if (!left && !center && !right)
			return false
	}

	self.renderAutomata = function() {
		var main = document.createElement('div')
		main.style.width = 5 * w + 'px'
		main.classList.add('main')
		document.body.appendChild(main)

		self.rowsRendered = 0
		self.renderRows()
	}

	self.renderRows = function() {
		if (self.rowsRendered < l)
			setTimeout(function() {
				self.renderNextRow()
				self.rowsRendered++
				self.renderRows()
			}, 10)
	}

	self.renderNextRow = function() {
		var main = document.querySelector('.main')

		var row = document.createElement('div')
		row.classList.add('row')

		var y = self.rowsRendered
		for (x = 0; x < w; x++)  {
			var cell = document.createElement('div')
			cell.classList.add('cell')

			if (self.automata[y][x])
				cell.classList.add('active')

			row.appendChild(cell)
		}

		main.appendChild(row)
	}
}

window.onload = function () {
	var automata = new Automata(300, 300)
	automata.generateAutomata()
	automata.renderAutomata()
}
