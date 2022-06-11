import api from "@/api/index";
const apiService: any = api;

let userService = new apiService.UserService();
let uploadService = new apiService.UploadService();
let imgSlideService = new apiService.ImgSlideService();
let courseCategoryService = new apiService.CourseCategoryService();
let courseOnlineService = new apiService.CourseOnlineService();
let teacherService = new apiService.TeacherService();
let courseTypeService = new apiService.CourseTypeService();
let lessonService = new apiService.LessonService();
let examsService = new apiService.ExamsService();
let questionService = new apiService.QuestionService();
let questionnaireService = new apiService.QuestionnaireService();
let faqtypeService = new apiService.FaqtypeService();
let faqService = new apiService.FaqService();
let articleService = new apiService.ArticleService();
let usabilityService = new apiService.UsabilityService();
let documenttypeService = new apiService.DocumenttypeService();
let documentService = new apiService.DocumentService();
let coursenotificationService = new apiService.CoursenotificationService();

export default (context: any) => {
    userService = new apiService.UserService(context.$axios);
    uploadService = new apiService.UploadService(context.$axios);
    imgSlideService = new apiService.ImgSlideService(context.$axios);
    courseCategoryService = new apiService.CourseCategoryService(context.$axios);
    courseOnlineService = new apiService.CourseOnlineService(context.$axios);
    teacherService = new apiService.TeacherService(context.$axios);
    courseTypeService = new apiService.CourseTypeService(context.$axios);
    lessonService = new apiService.LessonService(context.$axios);
    examsService = new apiService.ExamsService(context.$axios);
    questionService = new apiService.QuestionService(context.$axios);
    questionnaireService = new apiService.QuestionnaireService(context.$axios);
    faqtypeService = new apiService.FaqtypeService(context.$axios);
    faqService = new apiService.FaqService(context.$axios);
    articleService = new apiService.ArticleService(context.$axios);
    usabilityService = new apiService.UsabilityService(context.$axios);
    documenttypeService = new apiService.DocumenttypeService(context.$axios);
    documentService = new apiService.DocumentService(context.$axios);
    coursenotificationService = new apiService.CoursenotificationService(context.$axios);
}

export {
    userService,
    uploadService,
    imgSlideService,
    courseCategoryService,
    courseOnlineService,
    teacherService,
    courseTypeService,
    lessonService,
    examsService,
    questionService,
    questionnaireService,
    faqtypeService,
    faqService,
    articleService,
    usabilityService,
    documenttypeService,
    documentService,
    coursenotificationService
}
