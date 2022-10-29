import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password must be a string' })
  currentPassword: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password must be a string' })
  newPassword: string;
}
