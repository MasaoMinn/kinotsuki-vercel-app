/*
  封装的图片组件，组合自react-bootstrap的Image组件，支持图片加载失败时自动切换源
  变量描述：
    src: 图片源
    alt_src: 备用图片源
    fallback: 加载失败时显示的图片源
    alt: 加载失败时显示的文字(未设置或无法显示fallback时)
  加载顺序:src -> alt_src ->（加载失败） fallback -> alt
  加载时会显示Spinner组件
  2025-04-07  by MasaoMinn
*/

import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import Image, { ImageLoader } from 'next/image';

interface PictureProps extends React.ComponentProps<typeof Image> {
  alt_src?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  spinnerAnimation?:'border' | 'grow'
  spinnerVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  loader?: ImageLoader ;
}

const Picture = ({
  src,
  alt_src,
  fallback,
  alt = '图片加载失败',
  loading = 'lazy',
  spinnerAnimation = 'border',
  spinnerVariant = 'primary',
  className = '',
  ...rest
}: PictureProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorLevel, setErrorLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null); // 新增ref
  const sourceChain = [src, alt_src, fallback].filter(Boolean) as string[];
  useEffect(() => {
    setCurrentSrc(src);
    setErrorLevel(0);
    setIsLoading(true);
  }, [src, alt_src, fallback]);
  useEffect(() => {
    if (imgRef.current?.complete) {
      handleImageLoad();
    }
  }, [currentSrc]);
  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(true);
    const nextLevel = errorLevel + 1;
    const nextSource = sourceChain[nextLevel];
    if (nextSource) {
      setCurrentSrc(nextSource);
      setErrorLevel(nextLevel);
    } else {
      setIsLoading(false);
    }
  };
  const totalAttempts = sourceChain.length;
  const isCompleteFailure = errorLevel >= totalAttempts - 1;
  return (
    <div className="position-relative">
      {isLoading && (
        <div className="top-50 start-50 translate-middle">
          <Spinner variant={spinnerVariant} animation={spinnerAnimation}  />
        </div>
      )}
      {!isCompleteFailure ? (
        <Image
          {...rest}
          src={currentSrc}
          ref={imgRef}
          alt={alt}
          loading={loading}
          loader={rest.loader}
          className={`${className} ${isLoading ? 'invisible' : 'visible'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div className="text-center p-2 bg-light text-muted small">{alt}</div>
      )}
    </div>
  );
};

export default Picture;