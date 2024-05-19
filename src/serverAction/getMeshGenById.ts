'use server'
import {knex} from '@api/Knex'

export const getMeshGenById = async (id: number) =>
  await knex('mesh_gen').where('id', id).first()
