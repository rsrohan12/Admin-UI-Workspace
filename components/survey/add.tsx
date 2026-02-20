// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm, Controller } from 'react-hook-form';
// import PasswordChecklist from 'react-password-checklist';
// import { useMutation, useQuery } from 'react-query';
// import { yupResolver } from '@hookform/resolvers/yup';
// import {
//   Input,
//   InputSelect,
//   ErrorMessage,
//   Label,
//   Textarea,
// } from '@/components/common';
// import { addUserSchema } from '@/validations';

// import { DefaultValue, BooleanValues } from '@/types';
// import { LINKS } from '@/constants';
// import 'react-phone-number-input/style.css';
// import PhoneInput, {
//   isValidPhoneNumber,
//   getCountryCallingCode,
// } from 'react-phone-number-input';
// import { phoneStyles } from '@/constants';
// import toast from 'react-hot-toast';
// import {
//   addBlockRequest,
//   TAddBlock,
// } from '@/client/endpoints/block-master/add-block';
// import { addBlockSchema } from '@/validations/block-master';
// import { addSurveySchema } from '@/validations/survey';
// import { addSurveyRequest } from '@/client/endpoints/survey/add-survey';

// const booleanOptions = Object.values(BooleanValues).map(value => ({
//   id: value,
//   name: value,
// }));

// const defaultCountryCode = 'US';

// const yesNoOptions = [
//   { id: 'yes', name: 'Yes' },
//   { id: 'no', name: 'No' },
// ];

// export const AddForm = () => {
//   const router = useRouter();
//   const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);
//   const [countryCode, setCountryCode] = useState('1');
//   const [isValidPassword, setIsValidPassword] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(true);

//   // const { data: roles } = useQuery(
//   //   [FETCH_ROLE_KEY],
//   //   () =>
//   //     fetchRoles({
//   //       size: 1000,
//   //       skip: 0,
//   //       search: "",
//   //       sorting: 'id DESC'
//   //     }),
//   //   {
//   //     keepPreviousData: false,
//   //     refetchOnWindowFocus: false,
//   //     retry: 0,
//   //     refetchOnMount: false,
//   //   }
//   // );

//   useEffect(() => {
//     if (roles && roles?.data?.length) {
//       let roleValues: DefaultValue[] = [];
//       roles?.data?.map((role) => {
//         roleValues.push({
//           id: role.id?.toString(),
//           name: role.name!,
//         });
//       });
//       setRoleOptions(roleValues);
//     }
//   }, [roles]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     watch,
//   } = useForm<any>({
//     mode: 'onBlur',
//     resolver: yupResolver(addSurveySchema),
//     defaultValues: {},
//   });

//   const { mutate: addNewSurvey } = useMutation(addSurveyRequest, {
//     onSuccess: res => {
//       router.push(LINKS.block_master.route);
//       // toast.success(res.data.message);
//     },
//   });

//   const onSubmit = (data: TAddBlock) => {
//     // const phoneCode = `+${countryCode}`;
//     // const phoneNumber = data.contact_number.replace(phoneCode, "");
//     // let payload = {
//     //   ...data,
//     //   contact_number: phoneNumber,
//     //   phone_code: phoneCode,
//     //   active: data.active === BooleanValues.YES ? "1" : "0",
//     // };
//     // addNewUser({
//     //   ...payload,
//     // });
//   };

//   return (
//     <div>
//       <div className="pt-5">
//         <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
//           <h6 className="mb-5 text-lg font-bold">Add Survey</h6>

//           <div className="flex flex-col sm:flex-row">
//             <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
//               <div>
//                 <Controller
//                   control={control}
//                   name="block"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Block"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="UID"
//                   {...register('uid')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.uid?.message}
//                   placeholder="Enter UID"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Name"
//                   {...register('name')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.name?.message}
//                   placeholder="Enter Owner Name"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="S/o"
//                   {...register('s_o')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.s_o?.message}
//                   placeholder="Enter Father/Husband Name"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Localty Name"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Road Name"
//                   {...register('road_name')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.road_name?.message}
//                   placeholder="Enter Road Name"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="H. No."
//                   {...register('h_no')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.h_no?.message}
//                   placeholder="Enter House Flat No"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Pin Code"
//                   {...register('pin_code')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.pin_code?.message}
//                   placeholder="Enter Pincode"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Mobile"
//                   {...register('mobile')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.mobile?.message}
//                   placeholder="Enter Mobile"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Email"
//                   {...register('email')}
//                   type="email"
//                   disabled={isEditMode}
//                   errorText={errors.email?.message}
//                   placeholder="Enter Email"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Property Type"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Building Name"
//                   {...register('email')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.email?.message}
//                   placeholder="Enter Building Name"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Unit No."
//                   {...register('unit_no')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.unit_no?.message}
//                   placeholder="Enter Unit No."
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Pmidc"
//                   {...register('pmidc')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.pmidc?.message}
//                   placeholder="Enter Unit No. P"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Marla"
//                   {...register('marla')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.marla?.message}
//                   placeholder="Enter Plot Area M"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Builtup Area Sqft"
//                   {...register('builtup_area_sqft')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.builtup_area_sqft?.message}
//                   placeholder="Enter B"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Yard"
//                   {...register('yard')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.yard?.message}
//                   placeholder="Enter Plot Area Ya"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Consrtruction Type"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Sqft"
//                   {...register('sqft')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.sqft?.message}
//                   placeholder="Enter Plot Area Sq"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Basement"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Biswa"
//                   {...register('biswa')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.biswa?.message}
//                   placeholder="Enter Plot Area B"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Property Use"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Construction Year"
//                   {...register('biswa')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.biswa?.message}
//                   placeholder="Enter Plot Area B"
//                 />
//               </div>
//               <div>
//                 <Controller
//                   control={control}
//                   name="role"
//                   shouldUnregister={false}
//                   rules={{ required: true }}
//                   render={({
//                     field: { onChange, value, onBlur },
//                     fieldState: { error },
//                   }) => (
//                     <InputSelect
//                       isMandatory
//                       onChange={(option: DefaultValue) =>
//                         onChange((option as DefaultValue).id)
//                       }
//                       options={roleOptions ?? []}
//                       getOptionValue={(option: DefaultValue) =>
//                         (option as DefaultValue).id.toString()
//                       }
//                       getOptionLabel={(option: DefaultValue) =>
//                         (option as DefaultValue).name
//                       }
//                       value={
//                         roleOptions &&
//                         roleOptions.find(item => item.id === value?.toString())
//                       }
//                       isDisabled={isEditMode}
//                       label="Floors"
//                       errorText={errors.role?.message}
//                       onBlur={onBlur}
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="AOB"
//                   {...register('biswa')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.biswa?.message}
//                   placeholder="Enter Age of Build"
//                 />
//               </div>
//               <div>
//                 <Input
//                   isMandatory
//                   inverted
//                   label="Form No."
//                   {...register('biswa')}
//                   type="text"
//                   disabled={isEditMode}
//                   errorText={errors.biswa?.message}
//                   placeholder="Enter Form No."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pt-5">
//         <div>
//           <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
//             <h6 className="mb-5 text-lg font-bold">Floors</h6>

//             {/* Main container with left and right sections */}
//           </div>
//         </div>
//       </div>

//       <div className="pt-5">
//         <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
//           <h6 className="mb-5 text-lg font-bold">Civic Amenities</h6>

//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//             <div>
//               <Input
//                 inverted
//                 label="Sewer"
//                 {...register('sewer')}
//                 type="text"
//                 errorText={errors.sewer?.message}
//                 placeholder="Enter Sewer Details"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Input
//                 inverted
//                 label="Water"
//                 {...register('water')}
//                 type="text"
//                 errorText={errors.water?.message}
//                 placeholder="Enter Water Details"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Input
//                 inverted
//                 label="Electricity"
//                 {...register('electricity')}
//                 type="text"
//                 errorText={errors.electricity?.message}
//                 placeholder="Enter Electricity Details"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Input
//                 inverted
//                 label="Property Tax Id"
//                 {...register('property_tax_id')}
//                 type="text"
//                 errorText={errors.property_tax_id?.message}
//                 placeholder="Enter Property Tax Id"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Controller
//                 control={control}
//                 name="street_light"
//                 render={({ field: { onChange, value, onBlur } }) => (
//                   <InputSelect
//                     onChange={(option: DefaultValue) =>
//                       onChange((option as DefaultValue).id)
//                     }
//                     options={yesNoOptions}
//                     getOptionValue={(option: DefaultValue) =>
//                       (option as DefaultValue).id.toString()
//                     }
//                     getOptionLabel={(option: DefaultValue) =>
//                       (option as DefaultValue).name
//                     }
//                     value={yesNoOptions.find(
//                       item => item.id === value?.toString(),
//                     )}
//                     label="Street Light"
//                     errorText={errors.street_light?.message}
//                     onBlur={onBlur}
//                     isDisabled={isEditMode}
//                   />
//                 )}
//               />
//             </div>

//             <div>
//               <Input
//                 inverted
//                 label="Disposal Id"
//                 {...register('disposal_id')}
//                 type="text"
//                 errorText={errors.disposal_id?.message}
//                 placeholder="Enter Disposal Id"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Input
//                 inverted
//                 label="Respondent Name"
//                 {...register('respondent_name')}
//                 type="text"
//                 errorText={errors.respondent_name?.message}
//                 placeholder="Enter Respondent Name"
//                 disabled={isEditMode}
//               />
//             </div>

//             <div>
//               <Controller
//                 control={control}
//                 name="exemption"
//                 render={({ field: { onChange, value, onBlur } }) => (
//                   <InputSelect
//                     onChange={(option: DefaultValue) =>
//                       onChange((option as DefaultValue).id)
//                     }
//                     options={roleOptions ?? []}
//                     getOptionValue={(option: DefaultValue) =>
//                       (option as DefaultValue).id.toString()
//                     }
//                     getOptionLabel={(option: DefaultValue) =>
//                       (option as DefaultValue).name
//                     }
//                     value={
//                       roleOptions &&
//                       roleOptions.find(item => item.id === value?.toString())
//                     }
//                     label="Exemption"
//                     errorText={errors.exemption?.message}
//                     onBlur={onBlur}
//                     isDisabled={isEditMode}
//                   />
//                 )}
//               />
//             </div>

//             <div className="col-span-1 sm:col-span-2">
//               <label className="mb-2 block text-sm font-medium">
//                 Status Checkboxes
//               </label>
//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('not_responding')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Not Responding</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('locked')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Locked</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('permanent_lock')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Permanent Lock</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('under_construction')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Under Construction</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('damage')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Damage</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('other')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Other</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('mobile_tower')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Mobile Tower</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     {...register('advertisement_kiosk')}
//                     className="form-checkbox"
//                     disabled={isEditMode}
//                   />
//                   <span>Advertisement Kiosk</span>
//                 </label>
//               </div>
//             </div>

//             <div className="col-span-1 sm:col-span-2">
//               <label className="mb-2 block text-sm font-medium">Remarks</label>
//               <textarea
//                 {...register('remarks')}
//                 className="form-textarea w-full"
//                 rows={3}
//                 placeholder="Enter Remarks"
//                 disabled={isEditMode}
//               />
//               {/* {errors.remarks && (
//                     <p className="text-red-500 text-sm mt-1">{errors.remarks.message}</p>
//                   )} */}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 flex gap-3">
//         {isEditMode ? (
//           <button
//             onClick={() => setIsEditMode(false)}
//             className="btn btn-primary">
//             Edit
//           </button>
//         ) : (
//           <div className="flex gap-3">
//             <button
//               className="btn btn-primary"
//               onClick={handleSubmit(onSubmit)}
//               disabled={!isValidPassword}>
//               Submit
//             </button>
//             <button
//               onClick={() => setIsEditMode(true)}
//               className="btn btn-danger">
//               Exit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
