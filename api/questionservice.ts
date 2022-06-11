interface IQuestionChoice {
  choice_id?: number | string,
  question_id?: number | string,
  choice_detail?: string,
  sort?: any,
  correct?: boolean,
  matched_choice_id?: number | string,
  fake_matched?: any,
  matched?: any,
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
}

interface IQuestion {
  question_id?: number | string,
  exams_id?: number | string,
  question_title?: string,
  question_detail?: string,
  type?: string,
  Choices: IQuestionChoice[],
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
}

interface IQuestionParams {
  exams_id?: number | string,
  question_id?: number | string,
  Question: IQuestion[],
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
  limit?: number,
  page?: number,
}

const questionTypes: any = {
  Radio: '/radio/QuestionRadio',
  Checkbox: '/checkbox/QuestionCheckbox',
}

class QuestionService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: IQuestionParams, type: string) => {
    try {
      return this.axios
        .$request({
          url: `${questionTypes[type]}/${params.exams_id}`,
          method: "GET",
          params: {
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.questions.forEach((item: IQuestion) => {
              this.list.push({
                question_id: item.question_id,
                exams_id: item.exams_id,
                question_title: item.question_title,
                question_detail: item.question_detail,
                type: item.type,
                Choices: item.Choices.map((choiceItem: IQuestionChoice) => ({
                  choice_id: choiceItem.choice_id,
                  question_id: choiceItem.question_id,
                  choice_detail: choiceItem.choice_detail,
                  sort: choiceItem.sort,
                  correct: choiceItem.correct,
                  matched_choice_id: choiceItem.matched_choice_id,
                  fake_matched: choiceItem.fake_matched,
                  matched: choiceItem.matched,
                  active: choiceItem.active,
                  created_by: choiceItem.created_by,
                  created_date: choiceItem.created_date,
                  updated_by: choiceItem.updated_by,
                  updated_date: choiceItem.updated_date,
                  deleted_by: choiceItem.deleted_by,
                  deleted_date: choiceItem.deleted_date,
                })),
                active: item.active,
                created_by: item.created_by,
                created_date: item.created_date,
                updated_by: item.updated_by,
                updated_date: item.updated_date,
                deleted_by: item.deleted_by,
                deleted_date: item.deleted_date
              });
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  get = (params: IQuestionParams, type: string) => {
    try {
      return this.axios
        .$request({
          url: `${questionTypes[type]}/${params.exams_id}`,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.questions.forEach((item: IQuestion) => {
              this.list.push({
                question_id: item.question_id,
                exams_id: item.exams_id,
                question_title: item.question_title,
                question_detail: item.question_detail,
                type: item.type,
                Choices: item.Choices.map((choiceItem: IQuestionChoice) => ({
                  choice_id: choiceItem.choice_id,
                  question_id: choiceItem.question_id,
                  choice_detail: choiceItem.choice_detail,
                  sort: choiceItem.sort,
                  correct: choiceItem.correct,
                  matched_choice_id: choiceItem.matched_choice_id,
                  fake_matched: choiceItem.fake_matched,
                  matched: choiceItem.matched,
                  active: choiceItem.active,
                  created_by: choiceItem.created_by,
                  created_date: choiceItem.created_date,
                  updated_by: choiceItem.updated_by,
                  updated_date: choiceItem.updated_date,
                  deleted_by: choiceItem.deleted_by,
                  deleted_date: choiceItem.deleted_date,
                })),
                active: item.active,
                created_by: item.created_by,
                created_date: item.created_date,
                updated_by: item.updated_by,
                updated_date: item.updated_date,
                deleted_by: item.deleted_by,
                deleted_date: item.deleted_date
              });
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  create = (params: IQuestionParams, type: string) => {
    try {
      const req_question = params.Question.map((item: IQuestion) => ({
        question_title: item.question_title,
        question_detail: item.question_detail,
        Choice: item.Choices.map((choiceItem: IQuestionChoice) => ({
          choice_detail: choiceItem.choice_detail,
          correct: choiceItem.correct
        }))
      }));
      return this.axios
        .$request({
          url: `${questionTypes[type]}/${params.exams_id}`,
          method: "POST",
          data: {
            Question: req_question,
            active: true,
            created_by: params.created_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  edit = (params: IQuestionParams, type: string) => {
    try {
      const req_question = params.Question.map((item: IQuestion) => ({
        question_title: item.question_title,
        question_detail: item.question_detail,
        Choice: item.Choices.map((choiceItem: IQuestionChoice) => ({
          ...(choiceItem.choice_id
            ? { choice_id: choiceItem.choice_id }
            : {}),
          choice_detail: choiceItem.choice_detail,
          correct: choiceItem.correct
        }))
      }))
      return this.axios
        .$request({
          url: `${questionTypes[type]}/${params.question_id}`,
          method: "PATCH",
          data: {
            ...req_question[0],
            updated_by: params.updated_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  delete = (params: IQuestionParams, type: string) => {
    return this.axios
      .$request({
        url: `${questionTypes[type]}/${params.question_id}`,
        method: "DELETE",
        data: {
          deleted_by: params.deleted_by,
        },
      })
      .then((response: any) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err: any) => console.error(err));
  }
}

export default QuestionService;
