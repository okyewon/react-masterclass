import { useForm } from "react-hook-form";

interface FormValues {
  toDo: string;
  email: string;
}

function TodoList() {
  /*  register에서 받은 문자열을 key값으로 watch에서 각 input value를 관찰
   handleSumit: submit할 때, valid / unValid 구분해서 함수 실행 
   const { register, watch, handleSubmit } = useForm(); */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onValid = (data: any) => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true, minLength: 10 })}
          placeholder="Write a to do"
        />
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Write a to do"
        />
        <span>{errors.email?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
