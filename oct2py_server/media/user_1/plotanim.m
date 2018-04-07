function [out] = plotanim(v)
	x = (-v:.1:v);
	for p = 1:5
	  plot (x, x.^p)
	  print animation.pdf -append
	endfor
	im = imread ("animation.pdf", "Index", "all");
	imwrite (im, "animation.gif", "DelayTime", .5)
endfunction