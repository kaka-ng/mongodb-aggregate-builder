import t from 'tap'
import { AggregateBuilder, MergePipeline, SortPipeline } from '../lib'

t.plan(1)
t.test('methods', function (t) {
  t.plan(35)
  const builder = new AggregateBuilder()

  t.test('addFields', function (t) {
    t.plan(1)
    const opt = { foo: 'bar' }
    builder.addFields(opt)
    t.has(builder.pipeline, /$addFields/)
  })

  t.test('bucket', function (t) {
    t.plan(1)
    const opt = {
      groupBy: '$year_born', // Field to group by
      boundaries: [1840, 1850, 1860, 1870, 1880], // Boundaries for the buckets
      default: 'Other', // Bucket id for documents which do not fall into a bucket
      output: { // Output for each bucket
        count: { $sum: 1 },
        artists:
          {
            $push: {
              name: { $concat: ['$first_name', ' ', '$last_name'] },
              year_born: '$year_born'
            }
          }
      }
    }
    builder.bucket(opt)
    t.has(builder.pipeline, /$bucket/)
  })

  t.test('bucketAuto', function (t) {
    t.plan(1)
    const opt = {
      groupBy: {
        $multiply: ['$dimensions.height', '$dimensions.width']
      },
      buckets: 4,
      output: {
        count: { $sum: 1 },
        titles: { $push: '$title' }
      }
    }
    builder.bucketAuto(opt)
    t.has(builder.pipeline, /$bucketAuto/)
  })

  t.test('collStats', function (t) {
    t.plan(1)
    const opt = { latencyStats: { histograms: true } }
    builder.collStats(opt)
    t.has(builder.pipeline, /$collStats/)
  })

  t.test('count', function (t) {
    t.plan(1)
    const opt = 'passing_scores'
    builder.count(opt)
    t.has(builder.pipeline, /$count/)
  })

  t.test('currentOp', function (t) {
    t.plan(1)
    const opt = { allUsers: true, idleSessions: true }
    builder.currentOp(opt)
    t.has(builder.pipeline, /$currentOp/)
  })

  t.test('facet', function (t) {
    t.plan(1)
    const opt = {
      categorizedByTags: [
        { $unwind: '$tags' },
        { $sortByCount: '$tags' }
      ],
      categorizedByPrice: [
        // Filter out documents without a price e.g., _id: 7
        { $match: { price: { $exists: 1 } } },
        {
          $bucket: {
            groupBy: '$price',
            boundaries: [0, 150, 200, 300, 400],
            default: 'Other',
            output: {
              count: { $sum: 1 },
              titles: { $push: '$title' }
            }
          }
        }
      ],
      'categorizedByYears(Auto)': [
        {
          $bucketAuto: {
            groupBy: '$year',
            buckets: 4
          }
        }
      ]
    }
    builder.facet(opt)
    t.has(builder.pipeline, /$facet/)
  })

  t.test('geoNear', function (t) {
    t.plan(1)
    const opt = {
      near: { type: 'Point', coordinates: [-73.99279, 40.719296] },
      distanceField: 'dist.calculated',
      maxDistance: 2,
      query: { category: 'Parks' },
      includeLocs: 'dist.location',
      spherical: true
    }
    builder.geoNear(opt)
    t.has(builder.pipeline, /$geoNear/)
  })

  t.test('graphLookup', function (t) {
    t.plan(1)
    const opt = {
      from: 'employees',
      startWith: '$reportsTo',
      connectFromField: 'reportsTo',
      connectToField: 'name',
      as: 'reportingHierarchy'
    }
    builder.graphLookup(opt)
    t.has(builder.pipeline, /$graphLookup/)
  })

  t.test('group', function (t) {
    t.plan(1)
    const opt = { _id: '$item' }
    builder.group(opt)
    t.has(builder.pipeline, /$group/)
  })

  t.test('indexStats', function (t) {
    t.plan(1)
    const opt = { }
    builder.indexStats(opt)
    t.has(builder.pipeline, /$indexStats/)
  })

  t.test('limit', function (t) {
    t.plan(1)
    const opt = 5
    builder.limit(opt)
    t.has(builder.pipeline, /$limit/)
  })

  t.test('listLocalSessions', function (t) {
    t.plan(1)
    const opt = { users: [{ user: 'myAppReader', db: 't.test' }] }
    builder.listLocalSessions(opt)
    t.has(builder.pipeline, /$listLocalSessions/)
  })

  t.test('listSessions', function (t) {
    t.plan(1)
    const opt = { users: [{ user: 'myAppReader', db: 't.test' }] }
    builder.listSessions(opt)
    t.has(builder.pipeline, /$listSessions/)
  })

  t.test('lookup', function (t) {
    t.plan(1)
    const opt = {
      from: 'inventory',
      localField: 'item',
      foreignField: 'sku',
      as: 'inventory_docs'
    }
    builder.lookup(opt)
    t.has(builder.pipeline, /$lookup/)
  })

  t.test('match', function (t) {
    t.plan(1)
    const opt = { $or: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] }
    builder.match(opt)
    t.has(builder.pipeline, /$match/)
  })

  t.test('merge', function (t) {
    t.plan(1)
    const opt: MergePipeline = { into: 'myOutput', on: '_id', whenMatched: 'replace', whenNotMatched: 'insert' }
    builder.merge(opt)
    t.has(builder.pipeline, /$merge/)
  })

  t.test('out', function (t) {
    t.plan(1)
    const opt = 'authors'
    builder.out(opt)
    t.has(builder.pipeline, /$out/)
  })

  t.test('planCacheStats', function (t) {
    t.plan(1)
    builder.planCacheStats()
    t.has(builder.pipeline, /$planCacheStats/)
  })

  t.test('project', function (t) {
    t.plan(1)
    const opt = { contact: 1, 'contact.address.country': 1 }
    builder.project(opt)
    t.has(builder.pipeline, /$project/)
  })

  t.test('redact', function (t) {
    t.plan(1)
    const opt = {
      $cond: {
        if: { $gt: [{ $size: { $setIntersection: ['$tags', ['STLW', 'G']] } }, 0] },
        then: '$$DESCEND',
        else: '$$PRUNE'
      }
    }
    builder.redact(opt)
    t.has(builder.pipeline, /$redact/)
  })

  t.test('replaceRoot', function (t) {
    t.plan(1)
    const opt = { newRoot: { $mergeObjects: [{ _id: '$_id', first: '', last: '' }, '$name'] } }
    builder.replaceRoot(opt)
    t.has(builder.pipeline, /$replaceRoot/)
  })

  t.test('replaceWith', function (t) {
    t.plan(1)
    const opt = { $mergeObjects: [{ _id: '$_id', first: '', last: '' }, '$name'] }
    builder.replaceWith(opt)
    t.has(builder.pipeline, /$replaceWith/)
  })

  t.test('sample', function (t) {
    t.plan(1)
    const opt = { size: 3 }
    builder.sample(opt)
    t.has(builder.pipeline, /$sample/)
  })

  t.test('set', function (t) {
    t.plan(1)
    const opt = {
      totalHomework: { $sum: '$homework' },
      totalQuiz: { $sum: '$quiz' }
    }
    builder.set(opt)
    t.has(builder.pipeline, /$set/)
  })

  t.test('skip', function (t) {
    t.plan(1)
    const opt = 5
    builder.skip(opt)
    t.has(builder.pipeline, /$skip/)
  })

  t.test('sort', function (t) {
    t.plan(1)
    const opt: SortPipeline = { borough: 1, _id: 1 }
    builder.sort(opt)
    t.has(builder.pipeline, /$sort/)
  })

  t.test('sortByCount', function (t) {
    t.plan(1)
    const opt = '$tags'
    builder.sortByCount(opt)
    t.has(builder.pipeline, /$sortByCount/)
  })

  t.test('unionWith', function (t) {
    t.plan(1)
    const opt = { coll: 'warehouses', pipeline: [{ $project: { state: 1, _id: 0 } }] }
    builder.unionWith(opt)
    t.has(builder.pipeline, /$unionWith/)
  })

  t.test('unset', function (t) {
    t.plan(1)
    const opt = 'copies'
    builder.unset(opt)
    t.has(builder.pipeline, /$unset/)
  })

  t.test('unwind', function (t) {
    t.plan(1)
    const opt = '$sizes'
    builder.unwind(opt)
    t.has(builder.pipeline, /$unwind/)
  })

  t.test('push', function (t) {
    t.plan(1)
    const opt = 'push'
    builder.push('count', opt)
    t.has(builder.pipeline, /$count/)
  })

  t.test('concat - array', function (t) {
    t.plan(1)
    const opt = [{ $count: 'concat' }]
    builder.concat(opt)
    t.has(builder.pipeline, /$count/)
  })

  t.test('concat - AggregateBuilder', function (t) {
    t.plan(1)
    const opt = new AggregateBuilder()
    opt.count('AggregateBuilder')
    builder.concat(opt)
    t.has(builder.pipeline, /$count/)
  })

  t.test('toArray', function (t) {
    t.plan(1)
    const pipeline = builder.toArray()
    t.same(builder.pipeline, pipeline)
  })
})
