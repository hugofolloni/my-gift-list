import { Event } from '../models/item';
import database from './database';

const eventsRepository = {
    create: (event: Event, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO events (name, date, owner) VALUES (?, ?, ?)';
        const params = [event.name, event.date, event.owner];
        database.run(sql, params, function(err) {   
            callback(this?.lastID);
        });
    },

    readAll: (callback: (events: Event[]) => void) => {
        const sql = 'SELECT * FROM events';
        const params: any[] = [];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    read: (id: number, callback: (event: Event) => void) => {
        const sql = 'SELECT * FROM events WHERE id = ?';
        const params = [id];
        database.get(sql, params, (err, row) => callback(row));
    },

    readOwnerFiltered: (filters: any, callback: (events: Event[]) => void) => {
        const sql = 'SELECT * FROM events WHERE owner = ?';
        const params = [filters.owner];
        database.all(sql, params, (err, rows) => callback(rows));
    },

    readFullFiltered: (filters: any, callback: (events: Event[]) => void) => {
        const sql = 'SELECT * FROM events WHERE owner = ? AND name = ?';
        const params = [filters.owner, filters.name];
        database.all(sql, params, (err, rows) => callback(rows));
    },


    update: (id: number, event: Event, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE events SET name = ?, date = ?, owner = ? WHERE id = ?';
        const params = [event.name, event.date, event.owner, id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    },

    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM events WHERE id = ?';
        const params = [id];
        database.run(sql, params, function(err) {
            callback(this.changes === 0);
        });
    },
}

export default eventsRepository;