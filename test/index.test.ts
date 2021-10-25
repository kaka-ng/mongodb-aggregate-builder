import t from 'tap'
import DefaultImport, { AggregateBuild } from '../lib'

t.plan(1)
t.test('import', function (t) {
  t.plan(2)

  t.test('default', function (t) {
    t.plan(2)
    t.equal(DefaultImport, AggregateBuild)
    t.equal('constructor' in DefaultImport, true)
  })

  t.test('{}', function (t) {
    t.plan(2)
    t.equal(AggregateBuild, DefaultImport)
    t.equal('constructor' in AggregateBuild, true)
  })
})
