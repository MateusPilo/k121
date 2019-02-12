/* eslint-disable no-undef */
import mongoose from 'mongoose';
import db from '../../config/database';


mongoose.connect = jest.fn().mockResolvedValue();

test('testa objeto banco', () => {
  expect(db).toBeDefined();
});

test('afirma que conectou no banco', async () => {
  let res = await db().connect();
  expect(res).toBe('Mongo connected');
});
