import t from 'tap'
import DefaultImport, { AggregateBuilder } from '../lib'

t.plan(1)
t.test('import', function (t) {
  t.plan(2)

  t.test('default', function (t) {
    t.plan(2)
    t.equal(DefaultImport, AggregateBuilder)
    t.equal('constructor' in DefaultImport, true)
  })

  t.test('{}', function (t) {
    t.plan(2)
    t.equal(AggregateBuilder, DefaultImport)
    t.equal('constructor' in AggregateBuilder, true)
  })
})
