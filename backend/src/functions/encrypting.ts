import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const ALGORITHM = 'aes-256-cbc'

export const encryptPassword = (password: string): string => {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is not set')
  }
  const iv = crypto.randomBytes(16)
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(password, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return iv.toString('hex') + ':' + encrypted
}

export const decryptPassword = (encryptedPassword: string): string => {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is not set')
  }
  const parts = encryptedPassword.split(':')
  const iv = Buffer.from(parts[0], 'hex')
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

  let decrypted = decipher.update(parts[1], 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
