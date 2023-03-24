import OrderRepository from "./OrderRepository";
import pgp from "pg-promise"

export default class OrderRepositoryDatabase implements OrderRepository {

    async save(order: any): Promise<void> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/cccat10");
        await connection.query("insert into cccat10.order (id_order, cpf, total, freight) values ($1, $2, $3, $4)", [order.idOrder, order.cpf, order.total, order.freight]);
        for (const item of order.items) {
            await connection.query("insert into cccat10.item (id_order, id_product, price, quantity) values ($1, $2, $3, $4)", [order.idOrder, item.idProduct, item.price, item.quantity]);
        }
        await connection.$pool.end();
    }

    async getById(id: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/cccat10");
        const [orderData] = await connection.query("select * from cccat10.order where id_order = R$1", [id]);
        await connection.$pool.end();
    }

}