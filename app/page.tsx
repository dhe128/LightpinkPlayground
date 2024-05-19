'use server'
import App from '@/component/App'
import {LightpinkInstance} from '@/state/UiSlice'
import {knex} from '@api/Knex'

const getLightpinkInstance = async ({
  timeline: timelineStr,
}: {
  timeline?: string
}): Promise<LightpinkInstance> => {
  const timeline = +timelineStr || 0
  const record = await knex('instance_state')
    .where('timeline', timeline)
    .orderBy('iteration', 'desc')
    .first()
  return {
    timeline: record?.timeline ?? 0,
    iteration: record?.iteration ?? 0,
  }
}

const Page = async ({
  params,
  searchParams,
}: {
  params: {slug: string}
  searchParams: {timeline?: string}
}) => {
  return <App initialInstance={await getLightpinkInstance(searchParams)} />
}

export default Page
