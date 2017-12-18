package com.loan.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 定义注释，忽略mysql与java的类型的兼容问题，
 * 如果mysql转java失败，则尝试转为java的String类型
 * 
 * @author Host-0222
 * 
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface IgnoreType
{
}
