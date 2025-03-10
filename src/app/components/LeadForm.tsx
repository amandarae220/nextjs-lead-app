"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Update import for Next.js App Router
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: File | null;
  additionalInfo: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    visas: [],
    resume: null,
    additionalInfo: ''
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      alert('Lead submitted successfully!');
      router.push('/thank-you');
    } else {
      alert('Error submitting the form. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h2>Submit Your Information</h2>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <Input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <Input type="url" name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} required />
        <Input type="file" name="resume" onChange={handleFileChange} required />
        <TextArea name="additionalInfo" placeholder="Additional Information" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
}
