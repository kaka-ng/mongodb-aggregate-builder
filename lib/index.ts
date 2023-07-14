export type Pipeline = Record<string, PipelineOptions>

export class AggregateBuilder {
  pipeline: Pipeline[]

  constructor () {
    this.pipeline = []
  }

  addFields (p: AddFieldsPipeline): this {
    return this.push('addFields', p)
  }

  bucket (p: BucketPipeline): this {
    return this.push('bucket', p)
  }

  bucketAuto (p: BucketAutoPipeline): this {
    return this.push('bucketAuto', p)
  }

  collStats (p: CollStatsPipeline): this {
    return this.push('collStats', p)
  }

  count (p: CountPipeline): this {
    return this.push('count', p)
  }

  currentOp (p: CurrentOpPipeline): this {
    return this.push('currentOp', p)
  }

  facet (p: FacetPipeline): this {
    return this.push('facet', p)
  }

  geoNear (p: GeoNearPipeline): this {
    return this.push('geoNear', p)
  }

  graphLookup (p: GraphLookupPipeline): this {
    return this.push('graphLookup', p)
  }

  group (p: GroupPipeline): this {
    return this.push('group', p)
  }

  indexStats (p: IndexStatsPipeline): this {
    return this.push('indexStats', p)
  }

  limit (p: LimitPipeline): this {
    return this.push('limit', p)
  }

  listLocalSessions (p: ListLocalSessionsPipeline): this {
    return this.push('listLocalSessions', p)
  }

  listSessions (p: ListSessionsPipeline): this {
    return this.push('listSessions', p)
  }

  lookup (p: LookupPipeline): this {
    return this.push('lookup', p)
  }

  match (p: MatchPipeline): this {
    return this.push('match', p)
  }

  merge (p: MergePipeline): this {
    return this.push('merge', p)
  }

  out (p: OutPipeline): this {
    return this.push('out', p)
  }

  planCacheStats (): this {
    return this.push('planCacheStats', {})
  }

  project (p: ProjectPipeline): this {
    return this.push('project', p)
  }

  redact (p: RedactPipeline): this {
    return this.push('redact', p)
  }

  replaceRoot (p: ReplaceRootPipeline): this {
    return this.push('replaceRoot', p)
  }

  replaceWith (p: ReplaceWithPipeline): this {
    return this.push('replaceWith', p)
  }

  sample (p: SamplePipeline): this {
    return this.push('sample', p)
  }

  set (p: SetPipeline): this {
    return this.push('set', p)
  }

  skip (p: SkipPipeline): this {
    return this.push('skip', p)
  }

  sort (p: SortPipeline): this {
    return this.push('sort', p)
  }

  sortByCount (p: SortByCountPipeline): this {
    return this.push('sortByCount', p)
  }

  unionWith (p: UnionWithPipeline): this {
    return this.push('unionWith', p)
  }

  unset (p: UnsetPipeline): this {
    return this.push('unset', p)
  }

  unwind (p: UnwindPipeline): this {
    return this.push('unwind', p)
  }

  push (stage: string, p: PipelineOptions): this {
    this.pipeline.push({
      ['$' + stage]: p
    })
    return this
  }

  concat (pipeline: AggregateBuilder | Pipeline[]): this {
    if (pipeline instanceof AggregateBuilder) {
      pipeline = pipeline.pipeline
    }
    this.pipeline = this.pipeline.concat(pipeline)
    return this
  }

  toArray (): Pipeline[] {
    return this.pipeline
  }
}

export default AggregateBuilder

export type PipelineOptions =
  AddFieldsPipeline |
  BucketPipeline |
  BucketAutoPipeline |
  CollStatsPipeline |
  CountPipeline |
  CurrentOpPipeline |
  FacetPipeline |
  GeoNearPipeline |
  GraphLookupPipeline |
  GroupPipeline |
  IndexStatsPipeline |
  LimitPipeline |
  ListLocalSessionsPipeline |
  ListSessionsPipeline |
  LookupPipeline |
  MatchPipeline |
  MergePipeline |
  OutPipeline |
  ProjectPipeline |
  RedactPipeline |
  ReplaceRootPipeline |
  ReplaceWithPipeline |
  SamplePipeline |
  SetPipeline |
  SkipPipeline |
  SortPipeline |
  SortByCountPipeline |
  UnionWithPipeline |
  UnsetPipeline |
  UnwindPipeline

export type AddFieldsPipeline = Record<string, unknown>

export interface BucketPipeline {
  groupBy: string | Record<string, unknown>
  boundaries: unknown[]
  default: string
  output?: Record<string, unknown>
}

export interface BucketAutoPipeline {
  groupBy: string | Record<string, unknown>
  buckets: number
  output?: Record<string, unknown>
  granularity?: 'R5' | 'R10' | 'R20' | 'R40' | 'R80' | '1-2-5' | 'E6' | 'E12' | 'E24' | 'E48' | 'E96' | 'E192' | 'POWERSOF2'
}

export interface CollStatsPipeline {
  latencyStats?: { histograms: boolean }
  storageStats?: { scale: number }
  count?: Record<string, unknown>
  queryExecStats?: Record<string, unknown>
}

export type CountPipeline = string

export interface CurrentOpPipeline {
  allUsers?: boolean
  idleConnections?: boolean
  idleCursors?: boolean
  idleSessions?: boolean
  localOps?: boolean
  backtrace?: boolean
}

export type FacetPipeline = Record<string, unknown[]>

export interface GeoNearPipeline {
  near: unknown
  distanceField: string
  spherical?: boolean
  maxDistance?: number
  query?: Record<string, unknown>
  distanceMultiplier?: number
  includeLocs?: string
  uniqueDocs?: boolean
  minDistance?: number
  key?: unknown
}

export interface GraphLookupPipeline {
  from: string
  startWith: string
  connectFromField: string
  connectToField: string
  as: string
  maxDepth?: number
  depthField?: string
  restrictSearchWithMatch?: Record<string, unknown>
}

export interface GroupPipeline {
  _id: string
  [key: string]: unknown
}

export type IndexStatsPipeline = Record<string, unknown>

export type LimitPipeline = number

export type ListLocalSessionsPipeline = Record<string, unknown> | {
  users: Array<{ user: string, db: string }>
} | { allUsers: true }

export type ListSessionsPipeline = Record<string, unknown> | {
  users: Array<{ user: string, db: string }>
} | { allUsers: true }

export interface LookupPipeline {
  from: string
  localField?: string
  foreignField?: string
  let?: Record<string, string>
  pipeline?: any[]
  as: string
}

export type MatchPipeline = Record<string, unknown>

export interface MergePipeline {
  into: string | OutPipeline
  on?: string | string[]
  whenMatched?: 'replace' | 'keepExisting' | 'merge' | 'fail'
  let?: Record<string, unknown>
  whenNotMatched?: 'insert' | 'discard' | 'fail'
}

export type OutPipeline = string | {
  db: string
  coll: string
}

export interface ProjectPipeline {
  _id?: 0 | false
  [key: string]: 0 | 1 | boolean | unknown | undefined
}

export type RedactPipeline = Record<string, unknown>

export interface ReplaceRootPipeline {
  newRoot: Record<string, unknown>
}

export type ReplaceWithPipeline = string | Record<string, unknown>

export interface SamplePipeline {
  size: number
}

export type SetPipeline = Record<string, unknown>

export type SkipPipeline = number

export type SortPipeline = Record<string, 1 | -1 | { $meta: 'textScore' }>

export type SortByCountPipeline = string | Record<string, unknown>

export interface UnionWithPipeline {
  coll: string
  pipeline?: unknown[]
}

export type UnsetPipeline = string | string[]

export type UnwindPipeline = string | {
  path: string
  includeArrayIndex?: string
  preserveNullAndEmptyArrays?: boolean
}
