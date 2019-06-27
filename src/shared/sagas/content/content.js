import { put, takeLatest } from 'redux-saga/effects'
import { CMS_PAGE_MAPPING, NAVIGATE } from '../../ducks/content/constants'
import { routing } from '../../../app/routes'

/**
 * Since for some routes we only get the type and the item, we need to perform a reversed search
 * on the action type.
 * Please remove this when we don't use google sheets as a cms anymore...
 * @param payload
 * @returns {IterableIterator<*|PutEffect<{type}>>}
 */
export function* navigate({ payload }) {
  const page = Object.keys(CMS_PAGE_MAPPING).find(
    key =>
      CMS_PAGE_MAPPING[key].type === payload.type &&
      CMS_PAGE_MAPPING[key].item === payload.item,
  )
  const routeType = Object.values(routing).find(value => value.page === page)
    .type
  const action = type => ({ type })
  yield put(action(routeType))
}

export default function* watchContentSaga() {
  yield takeLatest(NAVIGATE, navigate)
}
