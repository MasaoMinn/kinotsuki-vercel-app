// 强制动态渲染，避免静态化和 revalidate 警告
export const dynamic = "force-dynamic";
import { supabase } from '@/app/api/utils/supabase';
import type { getLikesResponse, postLikesResponse } from '@/app/api/utils/types/likes';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const idStr = url.searchParams.get('id');
    const id = idStr ? Number(idStr) : undefined;
    if (!id || isNaN(id)) {
      return NextResponse.json<getLikesResponse>({
        status: 400,
        message: 'Missing or invalid id',
        data: { like: 0, dislike: 0, upd_time: '' }
      });
    }
    const { data, error } = await supabase
      .from('likes')
      .select('like,dislike,upd_time')
      .eq('id', id)
      .single();
    if (error) {
      return NextResponse.json<getLikesResponse>({
        status: 500,
        message: error?.message || 'Internal server error',
        data: { like: 0, dislike: 0, upd_time: '' }
      });
    }
    if (!data) {
      return NextResponse.json<getLikesResponse>({
        status: 404,
        message: 'Not found',
        data: { like: 0, dislike: 0, upd_time: '' }
      });
    }
    return NextResponse.json<getLikesResponse>({
      status: 200,
      message: 'Success',
      data: {
        like: data.like,
        dislike: data.dislike,
        upd_time: data.upd_time,
      }
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: 'Internal server error:' + err,
      data: { like: 0, dislike: 0 }
    });
  }
}

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();
    if (!id || !type || !['like', 'dislike'].includes(type)) {
      return NextResponse.json<postLikesResponse>({
        status: 400,
        message: 'Missing or invalid id/type' + id + ' ' + type
      });
    }

    const { data: current, error: getError } = await supabase
      .from('likes')
      .select('like,dislike')
      .eq('id', id)
      .single();

    if (getError || !current) {
      return NextResponse.json<postLikesResponse>({
        status: 404,
        message: 'Record not found'
      });
    }

    const newValue = current[type as 'like' | 'dislike'] + 1;
    const { data: updated, error: updateError } = await supabase
      .from('likes')
      .update({ [type]: newValue })
      .eq('id', id)
      .select('like,dislike,upd_time')
      .single();

    if (updateError || !updated) {
      return NextResponse.json<postLikesResponse>({
        status: 500,
        message: updateError?.message || 'Update failed'
      });
    }
    return NextResponse.json<postLikesResponse>({
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.error('ERROR in POST handler:', err);
    return NextResponse.json<postLikesResponse>({
      status: 502,
      message: 'Internal server error'
    });
  }
}