import * as yup from 'yup'

export const CreateSchema = yup.object({
  heading: yup.string().required('Vui lòng nhập phần mở đầu').min(3, 'Phần mở đầu tối thiểu 5 kí tự'),
  title: yup.string().required('Vui lòng nhập tiêu đề').min(3, 'Tiêu đề tối thiểu 5 kí tự'),
  content: yup
    .string()
    .required('Vui lòng nhập nội dung')
    .min(10, 'Nội dung tối thiểu 10 kí tự')
    .max(150, 'Nội dung tối đa 150 kí tự')
})

export type CreateSchemaType = yup.InferType<typeof CreateSchema>

export const EditSchema = yup.object({
  heading: yup.string().required('Vui lòng nhập phần mở đầu').min(3, 'Phần mở đầu tối thiểu 5 kí tự'),
  title: yup.string().required('Vui lòng nhập tiêu đề').min(3, 'Tiêu đề tối thiểu 5 kí tự'),
  content: yup
    .string()
    .required('Vui lòng nhập nội dung')
    .min(10, 'Nội dung tối thiểu 10 kí tự')
    .max(150, 'Nội dung tối đa 150 kí tự'),
  type: yup.string().required('Vui lòng chọn trạng thái')
})

export type EditSchemaType = yup.InferType<typeof EditSchema>
