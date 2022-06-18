import database from './database';
import { Gift } from '../models/item';

const giftRepository = {
    create: (gift: Gift, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO gifts (name, price, description, url, checked, image, event) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [gift.name, gift.price, gift.description, gift.url, gift.checked, gift.image, gift.event];
        database.run(sql, params, function(err) {
            callback(this?.lastID);
        });
    },

    readAll: (callback: (gifts: Gift[]) => void) => {
        const sql = 'SELECT * FROM gifts';
        const params: any[] = [];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    readEventFiltered: (filters: any, callback: (gifts: Gift[]) => void) => {
        const sql = 'SELECT * FROM gifts WHERE event = ?';
        const params = [filters.event];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    readFullFiltered: (filters: any, callback: (gifts: Gift[]) => void) => {
        const sql = 'SELECT * FROM gifts WHERE event = ? AND name = ?';
        const params = [filters.event, filters.name];
        database.all(sql, params, (err, rows) => callback(rows));
    },


    read: (id: number, callback: (gift: Gift) => void) => {
        const sql = 'SELECT * FROM gifts WHERE id = ?';
        const params = [id];
        database.get(sql, params, (err, row) => callback(row));
    },

    update: (id: number, gift: Gift, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE gifts SET name = ?, price = ?, description = ?, url = ?, checked = ?, image = ?, event = ? WHERE id = ?';
        const params = [gift.name, gift.price, gift.description, gift.url, gift.checked, gift.image, gift.event, id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    },

    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM gifts WHERE id = ?';
        const params = [id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    }

}

export default giftRepository;