export default class Table {
	public table: Number[][];
	public width: number;
	public height: number;

	constructor(width: number = 5, height: number = width) {
		this.width = width;
		this.height = height;

		const x = Array(width);
		const y = new Array(height);

		y.fill(0);
		x.fill(y);

		this.table = x;
	}
}