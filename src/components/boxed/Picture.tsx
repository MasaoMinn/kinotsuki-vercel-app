/*
  封装的图片组件，组合自next的Image组件，支持图片加载失败时自动切换源
  变量描述：
    srcs: 图片源数组，按顺序尝试加载
    alt: 图片替代文字
    spinner: Spinner配置对象
      - animation: Spinner动画类型(border/grow)
      - variant: Spinner颜色变体
      - size: Spinner大小
      - className: Spinner额外样式类
      - as: 自定义渲染元素类型
      - bsPrefix: CSS类名前缀
      - role: ARIA角色
  加载顺序: srcs[0] -> srcs[1] -> ... -> 加载失败显示alt文本
  加载时会显示Spinner组件，支持用户自定义Spinner样式
  2025-04-07  by MasaoMinn
*/

import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Image, { ImageProps } from 'next/image';

interface SpinnerConfig {
  animation?: 'border' | 'grow';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
}

interface PictureProps extends Omit<ImageProps, 'src'> {
  srcs: string[];
  spinner?: SpinnerConfig;
}

const Picture = ({
  srcs,
  alt,
  className = '',
  spinner = {},
  ...rest
}: PictureProps) => {
  const {
    animation = 'border',
    variant = 'primary',
    className: spinnerClassName = '',
  } = spinner;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleImageError = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < srcs.length) {
      // 尝试下一个图片源
      setCurrentIndex(nextIndex);
      setIsLoading(true);
    } else {
      // 所有图片源都加载失败
      setIsLoading(false);
      setLoadError(true);
    }
  };

  // 确保srcs数组有效
  if (!srcs || !Array.isArray(srcs) || srcs.length === 0) {
    return (
      <div className="text-center p-2 bg-light text-muted small">
        Picture source array is invalid
      </div>
    );
  }

  return (
    <div className="position-relative">
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner
            animation={animation}
            variant={variant}
            className={`${spinnerClassName} max-w-16 max-h-16`}
          />
        </div>
      )}

      {/* 加载失败显示 */}
      {loadError ? (
        <div className="text-center p-2 bg-light text-muted small">
          {alt || 'Picture load failed'}
        </div>
      ) : (
        /* 主图片 */
        <Image
          {...rest}
          src={srcs[currentIndex]}
          alt={alt || 'Picture'}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default Picture;