import database from './database';
import { User } from '../models/item';

const userRepository = {
    create: (user: User, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
        const params = [user.name, user.username, user.email, user.password];
        database.run(sql, params, function(err) {
            callback(this?.lastID);
        });
    },

    readAll: (callback: (users: User[]) => void) => {
        const sql = 'SELECT * FROM users';
        const params: any[] = [];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    readFiltered: (filters: any, callback: (users: User[]) => void) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const params = [filters.username];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    read: (id: number, callback: (user: User) => void) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const params = [id];
        database.get(sql, params, (err, row) => callback(row));
    },

    update: (id: number, user: User, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE users SET name = ?, username = ?, email = ?, password = ? WHERE id = ?';
        const params = [user.name, user.email, user.password, id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    },

    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const params = [id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    }

}

export default userRepository;