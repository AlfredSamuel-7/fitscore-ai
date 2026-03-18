export type AnalyzeResult = {
  match_score: number
  semantic_score: number
  skill_coverage: number
  skills_in_resume: string[]
  missing_skills: string[]
  recommendations: string[]
}

export type HistoryItem = {
  id: number
  match_score: number
  semantic_score: number
  skill_coverage: number
  skills_in_resume: string[]
  missing_skills: string[]
  created_at: string
}
