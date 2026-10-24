'use client';

import { useState, type FormEvent } from 'react';
import type { FieldErrors, RequestResult } from '../types/Requests.type';
import { submitRequest } from '../utils/submitRequest.util';

type FormValues = Record<string, string | boolean>;
export type SuccessResult = Extract<RequestResult, { ok: true }>;

type Options<T extends FormValues> = {
  initialValues: T;
  validate: (values: T) => FieldErrors;
  /** Shapes the values into the API payload (adds `type`, nests fields…). */
  toPayload: (values: T) => Record<string, unknown>;
  onSuccess?: (result: SuccessResult, values: T) => void;
};

/** Shared form state for every public form: values, field errors, sending, result. */
export function useRequestForm<T extends FormValues>({ initialValues, validate, toPayload, onSuccess }: Options<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [result, setResult] = useState<SuccessResult | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const setField = (name: keyof T & string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // After the errors render, bring the first invalid field into view (it may be off-screen on mobile).
    const focusFirstInvalid = () =>
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormMessage('Revisa los campos marcados.');
      focusFirstInvalid();
      return;
    }
    setIsSending(true);
    setFormMessage('');
    const response = await submitRequest(toPayload(values), honeypot);
    setIsSending(false);
    if (!response.ok) {
      setErrors(response.errors ?? {});
      setFormMessage(response.message);
      focusFirstInvalid();
      return;
    }
    setResult(response);
    onSuccess?.(response, values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setFormMessage('');
    setResult(null);
  };

  return { values, errors, isSending, formMessage, result, setField, handleSubmit, reset, honeypot, setHoneypot };
}
