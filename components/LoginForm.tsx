import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { styled } from '../stitches.config'
import TextField from './TextField'
import FormLabel from './FormLabel'
import FormHint from './FormHint'
import Button from './Button'
import FormControl from './FormControl'
import { obtainToken } from '../utils/api'
import { useAuth } from '../utils/auth'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const setToken = useAuth((s) => s.setToken)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<schema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (values: schema) => {
    obtainToken(values)
      .then(({ access }) => {
        setToken(access)
      })
      .then(() => router.push('/'))
      .catch(() => {
        toast.error('Incorrect email or password')
        reset()
      })
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        error={Boolean(errors.email?.message)}
        css={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          {...register('email')}
          placeholder="dave@gamboa.com"
        />
        <FormHint>{errors.email?.message}</FormHint>
      </FormControl>

      <FormControl
        error={Boolean(errors.password?.message)}
        css={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField id="password" type="password" {...register('password')} />
        <FormHint>{errors.password?.message}</FormHint>
      </FormControl>

      <Button variant="primary" size="lg" type="submit">
        Log in
      </Button>
    </StyledForm>
  )
}

const loginSchema = z.object({
  email: z.string().min(1, 'Enter your email').email(),
  password: z.string().min(1, 'Enter a password'),
})

type schema = z.infer<typeof loginSchema>

const StyledForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})
