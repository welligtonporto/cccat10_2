import OrderRepository from "./OrderRepository";

export default class GetOrder {

	constructor (
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
	) {
	}

	async execute (id: string): Promise<Output> {
		const output: Output = {
			total: 0,
			freight: 0
		};
		const orderData = await this.orderRepository.getById(id);
		output.total = orderData.total;
		output.freight = orderData.freight;
		return output;
	}
}

type Output = {
	total: number,
	freight: number
}