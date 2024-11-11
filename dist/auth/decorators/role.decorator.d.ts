import { Roles } from 'src/role/role-types';
export declare function Role(...role: Roles[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
